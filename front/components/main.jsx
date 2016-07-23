const React = require('react');
const { dispatcher } = require('react-dispatcher-decorator');

@dispatcher
class Child extends React.Component {
  render() {
    const { photos, displayName } = this.props.user;
    if (photos === undefined) return <Loading/>;
    return (
      <div>
        hello
        <img src={photos[0].value} alt="UserIcon"/>
        <div>{displayName}</div>
        <button onClick={() => this.context.dispatch('tweet', 20) }>hoge</button>
      </div>
    );
  }
}

function Input({placeholder, value, onChange}) {
  return <input type="text" placeholder={placeholder} value={value} onChange={onChange}/>;
}

@dispatcher
class StoreArea extends React.Component {
  render() {
    const { title, firstCirculation, printingCost, distriPrice } = this.props.copyData;
    const tt = {
      placeholder: 'タイトル'
      , value: title
      , onChange: (e) => { this.context.dispatch('changeTitle', e.currentTarget.value); }
    };
    const fc = {
      placeholder: '初期部数'
      , value: firstCirculation
      , onChange: (e) => { this.context.dispatch('changeFirstCirculation', e.currentTarget.value); }
    };
    const pc = {
      placeholder: '印刷費'
      , value: printingCost
      , onChange: (e) => { this.context.dispatch('changePrintingCost', e.currentTarget.value); }
    };
    const dp = {
      placeholder: '頒布価格'
      , value: distriPrice
      , onChange: (e) => { this.context.dispatch('changeDistriPrice', e.currentTarget.value); }
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
        <input type="button" value="保存" onClick={() => this.context.dispatch('saveCopyData', this.props.copyData) }/>
      </form>
    );
  }
}



@dispatcher
class Increment extends React.Component {
  render() {
    return (
      <div>
        <input type="button" value="+" onClick={() => this.context.dispatch('increment') }/>
        <input type="button" value="-" onClick={() => this.context.dispatch('decrement') }/>
      </div>
    );
  }
}

function Loading() {
  return (<div>now loading.</div>);
}
module.exports = { Child, StoreArea, Increment };
