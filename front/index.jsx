const React = require('react');
const { render } = require('react-dom');
const { subscriber } = require('react-dispatcher-decorator');
const Child = require('./components/main.jsx');

@subscriber((self, subscribe) => {
  subscribe('foo', (prop) => {
    console.log('foo received on', prop);
    // self.setState({...})
  });
})
class Main extends React.Component {
  render() {
    return <Child/>;
  }
}

render(<Main/>, document.getElementById('container'));
