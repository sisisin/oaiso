const React = require('react');
const { dispatcher } = require('react-dispatcher-decorator');

@dispatcher
class Child extends React.Component {
  render() {
    return (
      <div>
        hello
      </div>
    );
        // <img src="user.photos[0].value" alt="UserIcon"/>
        // <div>user.displayName</div>

  }
}

module.exports = Child;
