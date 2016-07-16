const React = require('react');
const { dispatcher } = require('react-dispatcher-decorator');

@dispatcher
class Child extends React.Component {
  render() {
    const { photos, displayName } = this.props.user;
    if(photos === undefined) return <Loading/>;
    return (
      <div>
        hello
        <img src={photos[0].value} alt="UserIcon"/>
        <div>{displayName}</div>
      </div>
    );
  }
}

function Loading() {
  return (<div>now loading.</div>);
}
module.exports = Child;
