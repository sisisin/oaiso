require('babel-polyfill');
import React = require('react');
import ReactDOM = require('react-dom');
import axios = require('axios');
import uuid = require('node-uuid');
import Flumpt = require('flumpt');
const { Flux, Component } = Flumpt;
const assign = Object.assign;

import { Main } from './components/main';
import {CopyStoreFactory, SoldStoreFactory} from './entity/models';
import {Events} from './entity/events';

class App extends Flux<IState> {
  copyStore = CopyStoreFactory();
  soldStore = SoldStoreFactory();

  subscribe() {
    this.on(Events.InitMain, () => {
      axios.get<IUser>('/api/profile')
        .then(res => {
          this.update(({solds, copyData}) => assign({}, { solds, copyData }, { user: res.data }));
        });
      (async () => {
        await this.copyStore.ready;
        const copyFromDb = (await this.copyStore.all())[0];
        this.update(({user, solds, copyData}) => {
          const newCopyData = copyFromDb == null ? assign({}, copyData, { _id: uuid.v1() }) : copyFromDb;
          return assign({}, { user, solds }, { copyData: newCopyData });
        });
      })();
      (async () => {
        await this.soldStore.ready;
        const solds = await this.soldStore.all();
        const newState = solds === null ? [] : solds;
        this.update(({user, copyData}) => assign({}, { user, copyData }, { solds: newState }));
      })();
    });

    this.on(Events.Tweet, (prop: any) => {
      console.log(`prop:${prop}`);
      return axios.post('/api/update', { message: `残り${prop}` }); // todo catch & alert
    });

    this.on(Events.ChangeFirstCirculation, (firstCirculationFromHtml: string) => {
      this.update(({user, copyData, solds}) => {
        if (Number.isNaN(+firstCirculationFromHtml)) { return { user, copyData, solds }; }
        const newCopyData = assign({}, copyData, { firstCirculation: +firstCirculationFromHtml })
        return assign({}, { user, solds }, { copyData: newCopyData });
      });
    });
    this.on(Events.ChangePrintingCost, (printingCostFromHtml: string) => {
      this.update(({user, copyData, solds}) => {
        if (Number.isNaN(+printingCostFromHtml)) { return { user, copyData, solds }; }        
        const newCopyData = assign({}, copyData, { printingCost: +printingCostFromHtml })
        return assign({}, { user, solds }, { copyData: newCopyData });
      });
    });
    this.on(Events.ChangeDistriPrice, (distriPriceFromHtml: string) => {
      this.update(({user, copyData, solds}) => {
        if (Number.isNaN(+distriPriceFromHtml)) { return { user, copyData, solds }; }        
        const newCopyData = assign({}, copyData, { distriPrice: +distriPriceFromHtml })
        return assign({}, { user, solds }, { copyData: newCopyData });
      });
    });
    this.on(Events.ChangeTitle, (title: string) => {
      this.update(({user, copyData, solds}) => {
        const newCopyData = assign({}, copyData, { title })
        return assign({}, { user, solds }, { copyData: newCopyData });
      });
    });
    this.on(Events.Increment, () => {
      this.update(async ({user, copyData}) => {
        const sold = 1;
        const {_id, distriPrice} = copyData;
        const userId = user.id;
        const insertTime = new Date();
        await this.soldStore.save({ userId, copyId: _id, sold, distriPrice, insertTime });
        const solds = await this.soldStore.all();
        return { user, copyData, solds };
      });
    });
    this.on(Events.Decrement, () => {
      this.update(async ({user, copyData}) => {
        const sold = -1;
        const {_id, distriPrice} = copyData;
        const userId = user.id;
        const insertTime = new Date();
        await this.soldStore.save({ userId, copyId: _id, sold, distriPrice, insertTime });
        const solds = await this.soldStore.all();
        return { user, copyData, solds };
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

const InitialState: IState = { solds: [], user: undefined, copyData: <any>{ _id: '', title: '', firstCirculation: '', printingCost: '', distriPrice: '' } };
const app = new App({
  renderer: el => { ReactDOM.render(el, document.getElementById('container')); }
  , initialState: InitialState
  , middlewares: [(state) => { console.log(state); return state; }]
});
app.update(s => s);
