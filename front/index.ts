require('babel-polyfill');
import React = require('react');
import ReactDOM = require('react-dom');
import axios = require('axios');
import uuid = require('node-uuid');
import Flumpt = require('flumpt');
const { Flux, Component } = Flumpt;
const assign = Object.assign;

import { Main } from './components/main';
import {CopyStoreFactory, SoldStoreFactory, CircleStoreFactory} from './entity/models';
import {Events} from './entity/events';
import {circleService, profileService} from './lib/services';

class App extends Flux<IState> {
  copyStore = CopyStoreFactory();
  soldStore = SoldStoreFactory();
  circleStore = CircleStoreFactory();

  subscribe() {
    this.on(Events.InitMain, () => {
      this.update(({solds, copyData, circle}) => {
        return profileService
          .get()
          .then(user => ({ solds, copyData, circle, user }));
      });

      this.update(async ({user, solds, copyData, circle}) => {
        await this.copyStore.ready;
        const copyFromDb = (await this.copyStore.all())[0];
        const newCopyData = copyFromDb == null ? assign({}, copyData, { _id: uuid.v1() }) : copyFromDb;
        return assign({}, { user, solds, circle }, { copyData: newCopyData });
      });

      this.update(async ({user, copyData, circle}) => {
        await this.soldStore.ready;
        const solds = await this.soldStore.all();
        const newState = solds == null ? [] : solds;
        return assign({}, { user, copyData, circle }, { solds: newState });
      });

      this.update(async ({user, copyData, solds, circle}) => {
        await this.circleStore.ready;
        const circleFromDb = (await this.circleStore.all())[0];
        if (circleFromDb != null) return { user, copyData, solds, circle: circleFromDb };
        const circleFromAPI = await circleService.get();
        if (circleFromAPI == null) {
          return { user, copyData, solds, circle: circleFromAPI };
        }
        const {id, name, twitter_id} = circleFromAPI;
        return { user, copyData, solds, circle: { _id: id, name, twitter_id } };
      });
    });

    this.on(Events.Tweet, (prop: any) => {
      console.log(`prop:${prop}`);
      return axios.post('/api/update', { message: `残り${prop}` }); // todo catch & alert
    });

    this.on(Events.ChangeFirstCirculation, (firstCirculationFromHtml: string) => {
      this.update(({user, copyData, solds, circle}) => {
        if (Number.isNaN(+firstCirculationFromHtml)) { return { user, copyData, solds, circle }; }
        const newCopyData = assign({}, copyData, { firstCirculation: +firstCirculationFromHtml })
        return assign({}, { user, solds, circle }, { copyData: newCopyData });
      });
    });
    this.on(Events.ChangePrintingCost, (printingCostFromHtml: string) => {
      this.update(({user, copyData, solds, circle}) => {
        if (Number.isNaN(+printingCostFromHtml)) { return { user, copyData, solds, circle }; }
        const newCopyData = assign({}, copyData, { printingCost: +printingCostFromHtml })
        return assign({}, { user, solds, circle }, { copyData: newCopyData });
      });
    });
    this.on(Events.ChangeDistriPrice, (distriPriceFromHtml: string) => {
      this.update(({user, copyData, solds, circle}) => {
        if (Number.isNaN(+distriPriceFromHtml)) { return { user, copyData, solds, circle }; }
        const newCopyData = assign({}, copyData, { distriPrice: +distriPriceFromHtml })
        return assign({}, { user, solds, circle }, { copyData: newCopyData });
      });
    });
    this.on(Events.ChangeTitle, (title: string) => {
      this.update(({user, copyData, solds, circle}) => {
        const newCopyData = assign({}, copyData, { title })
        return assign({}, { user, solds, circle }, { copyData: newCopyData });
      });
    });
    this.on(Events.Increment, () => {
      this.update(async ({user, copyData, circle}) => {
        const sold = 1;
        const {_id, distriPrice} = copyData;
        const userId = user.id;
        const insertTime = new Date();
        await this.soldStore.save({ userId, copyId: _id, sold, distriPrice, insertTime });
        const solds = await this.soldStore.all();
        return { user, copyData, solds, circle };
      });
    });
    this.on(Events.Decrement, () => {
      this.update(async ({user, copyData, circle}) => {
        const sold = -1;
        const {_id, distriPrice} = copyData;
        const userId = user.id;
        const insertTime = new Date();
        await this.soldStore.save({ userId, copyId: _id, sold, distriPrice, insertTime });
        const solds = await this.soldStore.all();
        return { user, copyData, solds, circle };
      });
    });
    this.on(Events.SaveCopyData, (props) => {
      return this.copyStore.save(props);
    });
  }
  render(state) {
    return React.createElement(Main, state);
  }
}

const InitialState: IState = {
  solds: []
  , user: undefined
  , copyData: <any>{ _id: '', title: '', firstCirculation: '', printingCost: '', distriPrice: '' }
  , circle: { _id: '', name: '', twitter_id: '' }
};
new App({
  renderer: el => { ReactDOM.render(el, document.getElementById('container')); }
  , initialState: InitialState
  , middlewares: [(state) => { console.log(state); return state; }]
}).update(s => s);
