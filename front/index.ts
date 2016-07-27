require('babel-polyfill');
import React = require('react');
import ReactDOM = require('react-dom');
import axios = require('axios');
import Immutable = require('immutable');
import uuid = require('node-uuid');
import Flumpt = require('flumpt');
const { Flux, Component } = Flumpt;

import { Main } from './components/main';
import {CopyStore, SoldStore} from './models/models';

class App extends Flux<IState> {
  copyStore: CopyStore;
  soldStore: SoldStore;
  constructor({renderer, initialState, middlewares}) {
    super({ renderer, initialState, middlewares });
    this.copyStore = new CopyStore();
    this.soldStore = new SoldStore();
  }

  subscribe() {
    this.on('init main', prop => {
      this.soldStore.ready;
      axios.get<IUser>('/api/profile')
        .then(res => {
          const {photos, displayName} = res.data;
          this.update(state => Object.assign({}, state, { user: { photos, displayName } }));
        });
      (async () => {
        await this.copyStore.ready;
        const copyData = (await this.copyStore.all())[0];
        const newState = (() => {
          if (copyData != null) { return { copyData }; }

          const oldState = Immutable.fromJS(this.state.copyData);
          const newState = oldState.set('_id', uuid.v1()).toJS();
          return { copyData: newState };
        })();
        this.update(state => Object.assign({}, state, newState))
      })();
    });

    this.on('tweet', (prop) => {
      console.log(`prop:${prop}`);
      return axios.post('/api/update', { message: `残り${prop}` }); // todo catch & alert
    });

    const updateInput = (self, label, value) => {
      const newState = Immutable.fromJS(self.state).setIn(['copyData', label], value).toJS();
      self.update(state => Object.assign({}, state, newState));
    };

    this.on('changeFirstCirculation', (firstCirculation) => {
      updateInput(this, 'firstCirculation', firstCirculation);
    });
    this.on('changePrintingCost', (printingCost) => {
      updateInput(this, 'printingCost', printingCost);
    });
    this.on('changeDistriPrice', (distriPrice) => {
      updateInput(this, 'distriPrice', distriPrice);
    });
    this.on('changeTitle', (title) => {
      updateInput(this, 'title', title);
    });
    this.on('increment', () => {
      const sold = 1;
      const distriPrice = this.state.copyData.distriPrice;
      this.soldStore.save({ sold, distriPrice });
    });

    this.on('saveCopyData', (props) => {
      return this.copyStore.save(props);
    });
  }
  render(state) {
    return React.createElement(Main, state);
  }
}

const app = new App({
  renderer: el => { ReactDOM.render(el, document.getElementById('container')); }
  , initialState: { user: {}, copyData: { _id: '', title: '', firstCirculation: '', printingCost: '', distriPrice: '' } }
  , middlewares: [(state) => { console.log(state); return state; }]
});
app.update(s => s);
