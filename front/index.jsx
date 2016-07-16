const React = require('react');
const { render } = require('react-dom');
const { subscriber } = require('react-dispatcher-decorator');
const axios = require('axios');
const Child = require('./components/main.jsx');

@subscriber((self, subscribe) => {
  subscribe('foo', (prop) => {
    console.log('foo received on', prop);
    // self.setState({...})
  });
})
class Main extends React.Component {
  constructor(){
    super();
    this.state = {user:{}};
  }
  componentDidMount(){
    axios.get('/api/profile')
      .then(res => {
        const {photos, displayName} = res.data;
        this.setState({user: {photos, displayName}});
      });
  }
  render() {
    return <Child user={this.state.user} />;
  }
}

render(<Main/>, document.getElementById('container'));
