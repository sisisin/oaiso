require('babel-polyfill');
const React = require('react');
const { render } = require('react-dom');
const { subscriber } = require('react-dispatcher-decorator');
const axios = require('axios');
const StoneSkin = require('stone-skin/with-tv4');
const {Child, StoreArea, Increment} = require('./components/main.jsx');
const Immutable = require('immutable');
const uuid = require('node-uuid');

class CopyStore extends StoneSkin.IndexedDb {
  get storeName() { return 'Copy'; }
  constructor() {
    super();
    const typeNumber = { type: 'number' };
    const typeString = { type: 'string' };
    this.schema = {
      _id: typeString
      , title: typeString
      , firstCirculation: typeNumber
      , printingCost: typeNumber
      , distriPrice: typeNumber
    };
  }
}
class SoldStore extends StoneSkin.IndexedDb {
  get storeName() { return 'Sold'; }
  constructor() {
    super();
    const typeNumber = { type: 'number' };
    this.schema = {
      sold: typeNumber
      , distriPrice: typeNumber
    };
  }
}

@subscriber((self, subscribe) => {
  subscribe('tweet', (prop) => {
    console.log(`prop:${prop}`);
    return axios.post('/api/update', { message: `残り${prop}` });
  });

  const updateInput = (self, label, value) => {
    const newState = Immutable.fromJS(self.state).setIn(['copyData', label], value).toJS();
    self.setState(newState);
  };

  subscribe('changeFirstCirculation', (firstCirculation) => {
    updateInput(self, 'firstCirculation', firstCirculation);
  });
  subscribe('changePrintingCost', (printingCost) => {
    updateInput(self, 'printingCost', printingCost);
  });
  subscribe('changeDistriPrice', (distriPrice) => {
    updateInput(self, 'distriPrice', distriPrice);
  });
  subscribe('changeTitle', (title) => {
    updateInput(self, 'title', title);
  });
  subscribe('increment', () => {
    const sold = 1;
    const distriPrice = self.state.copyData.distriPrice;
    self.soldStore.save({ sold, distriPrice });
  });

  subscribe('saveCopyData', (props) => {
    return self.copyStore.save(props);
  });
})
class Main extends React.Component {
  constructor() {
    super();
    this.state = { user: {}, copyData: { _id: '', title: '', firstCirculation: '', printingCost: '', distriPrice: '' } };
    this.copyStore = new CopyStore();
    this.soldStore = new SoldStore();
  }
  componentDidMount() {
    axios.get('/api/profile')
      .then(res => {
        const {photos, displayName} = res.data;
        this.setState({ user: { photos, displayName } });
      });
    (async () => {
      await this.copyStore.ready;
      const copyData = (await this.copyStore.all())[0];
      if(copyData == null) {
        const oldState = Immutable.fromJS(this.state.copyData);
        const newState = oldState.set('_id', uuid()).toJS();
        this.setState({copyData: newState});
      } else {
         this.setState({copyData});
      }
      
      this.soldStore.ready;
    })();
  }
  render() {
    const {user, copyData} = this.state;
    return (
      <div>
        <Child user={user} />
        <hr/>
        <StoreArea copyData={copyData} />
        <hr/>
        <Increment />
      </div>
    );
  }
}

render(<Main/>, document.getElementById('container'));
