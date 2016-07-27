const React = require('react');
const { Component } = require('flumpt');

class Main extends Component {
  componentDidMount() {
    this.dispatch('init main');
  }
  render() {
    const {user, copyData} = this.props;
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

class Child extends Component {
  render() {
    const { photos, displayName } = this.props.user;
    if (photos === undefined) return <Loading/>;
    return (
      <div>
        hello
        <img src={photos[0].value} alt="UserIcon"/>
        <div>{displayName}</div>
        <button onClick={() => this.dispatch('tweet', 20) }>hoge</button>
      </div>
    );
  }
}

function Input({placeholder, value, onChange}) {
  return <input type="text" placeholder={placeholder} value={value} onChange={onChange}/>;
}

class StoreArea extends Component {
  render() {
    const { title, firstCirculation, printingCost, distriPrice } = this.props.copyData;
    const tt = {
      placeholder: 'タイトル'
      , value: title
      , onChange: (e) => { this.dispatch('changeTitle', e.currentTarget.value); }
    };
    const fc = {
      placeholder: '初期部数'
      , value: firstCirculation
      , onChange: (e) => { this.dispatch('changeFirstCirculation', e.currentTarget.value); }
    };
    const pc = {
      placeholder: '印刷費'
      , value: printingCost
      , onChange: (e) => { this.dispatch('changePrintingCost', e.currentTarget.value); }
    };
    const dp = {
      placeholder: '頒布価格'
      , value: distriPrice
      , onChange: (e) => { this.dispatch('changeDistriPrice', e.currentTarget.value); }
    };
    return (
      <form>
        <Input {...tt}/>
        <br/>
        <Input {...fc}/>
        <br/>
        <Input {...pc}/>
        <br/>
        <Input {...dp}/>
        <input type="button" value="保存" onClick={() => this.dispatch('saveCopyData', this.props.copyData) }/>
      </form>
    );
  }
}

class Increment extends Component {
  render() {
    return (
      <div>
        <input type="button" value="+" onClick={() => this.dispatch('increment') }/>
        <input type="button" value="-" onClick={() => this.dispatch('decrement') }/>
      </div>
    );
  }
}

function Loading() {
  return (<div>now loading.</div>);
}
module.exports = Main;
