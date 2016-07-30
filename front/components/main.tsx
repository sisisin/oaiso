import React = require('react');
import Flumpt = require('flumpt');
const { Component } = Flumpt;

import {Events} from '../entity/events';

export class Main extends Component<IState, {}> {
  componentDidMount() {
    this.dispatch(Events.InitMain);
  }
  render() {
    // const {isRegisterd} = this.props.circle;
    // if (isRegisterd) {
      return <Circle {...this.props}/>;
    // } else {
    //   return <Registration {...this.props.circle}/>;
    // }
  }
}

class Registration extends Component<ICircleStore, {}>{
  render() {
    const { name } = this.props;
    const c = {
      placeholder: 'サークル名'
      , value: name
      , onChange: (e) => { this.dispatch(Events.ChangeCircleName, e.currentTarget.value); }
    };

    return (
      <div>
        <form><Input {...c} /></form>
      </div>
    );
  }
}
class Circle extends Component<IState, {}> {
  render() {
    const {solds, user, copyData, circle} = this.props;
    return (
      <div>
        <Child {...user} />
        <hr/>
        <StoreArea copyData={copyData} />
        <hr/>
        <Increment />
        <hr/>
        <Sold copyData={copyData} solds={solds}/>
      </div>
    );
  }
}
class Child extends Component<IUser, {}> {
  render() {
    const { photos, displayName } = this.props;
    if (photos === undefined) return <Loading/>;
    return (
      <div>
        hello
        <img src={photos[0].value} alt="UserIcon"/>
        <div>{displayName}</div>
        <button onClick={() => this.dispatch(Events.Tweet, 20) }>hoge</button>
      </div>
    );
  }
}

function Input({placeholder, value, onChange}) {
  return <input type="text" placeholder={placeholder} value={value} onChange={onChange}/>;
}

class StoreArea extends Component<{ copyData: ICopyStore }, {}> {
  render() {
    const { title, firstCirculation, printingCost, distriPrice } = this.props.copyData;
    const tt = {
      placeholder: 'タイトル'
      , value: title
      , onChange: (e) => { this.dispatch(Events.ChangeTitle, e.currentTarget.value); }
    };
    const fc = {
      placeholder: '初期部数'
      , value: firstCirculation
      , onChange: (e) => { this.dispatch(Events.ChangeFirstCirculation, e.currentTarget.value); }
    };
    const pc = {
      placeholder: '印刷費'
      , value: printingCost
      , onChange: (e) => { this.dispatch(Events.ChangePrintingCost, e.currentTarget.value); }
    };
    const dp = {
      placeholder: '頒布価格'
      , value: distriPrice
      , onChange: (e) => { this.dispatch(Events.ChangeDistriPrice, e.currentTarget.value); }
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
        <input type="button" value="保存" onClick={() => this.dispatch(Events.SaveCopyData, this.props.copyData) }/>
      </form>
    );
  }
}

class Increment extends Component<{}, {}> {
  render() {
    return (
      <div>
        <input type="button" value="+" onClick={() => this.dispatch(Events.Increment) }/>
        <input type="button" value="-" onClick={() => this.dispatch(Events.Decrement) }/>
      </div>
    );
  }
}

function Sold({solds, copyData}: { solds: ISoldStore[]; copyData: ICopyStore; }) {
  const numberOfSold = solds.reduce<number>((p, c) => p + c.sold, 0);
  const totalDistribution = solds.reduce<number>((prv, cur) => prv + (cur.sold * cur.distriPrice), 0);
  const totalLoss = copyData.printingCost - totalDistribution
  const restCopies = copyData.firstCirculation - numberOfSold;
  return (
    <div>
      number of sold: {numberOfSold}
      <br/>
      total distribution: {totalDistribution}
      <br/>
      total loss: {totalLoss}
      <br/>
      rest copies: {restCopies}
      <br/>
      <table>
        <thead>
          <tr><th>UserId</th><th>CopyId</th><th>Sold</th><th>price</th><th>insertTime</th></tr>
        </thead>
        <tbody>{solds.map(v => SoldList(v)) }</tbody>
      </table>
    </div>
  );
}

function SoldList({_id, userId, copyId, sold, distriPrice, insertTime}: ISoldStore) {
  return (
    <tr key={_id}>
      <td>{userId}</td>
      <td>{copyId}</td>
      <td>{sold}</td>
      <td>{distriPrice}</td>
      <td>{insertTime.toLocaleString() }</td>
    </tr>
  );
}

function Loading() {
  return (<div>now loading.</div>);
}
