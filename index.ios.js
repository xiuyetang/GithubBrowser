'use strict';

var React = require('react-native');
var { AppRegistry, Component } = React;

var Login = require('./Login');
var Loading = require('./Loading');
var AppContainer = require('./AppContainer');
var AuthService = require('./AuthService');

class GithubBrowser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      checkingAuth: true
    };
  }

  componentDidMount() {
    AuthService.getAuthInfo((err, authInfo) => {
      this.setState({
        checkingAuth: false,
        authenticated: authInfo !== undefined
      });
    });
  }

  render() {
    if(this.state.checkingAuth) {
      return <Loading />;
    }

    if(this.state.authenticated) {
      return <AppContainer />;
    } else {
      return <Login onLogin={this.onLogin.bind(this)} />;
    }
  }

  onLogin() {
    this.setState({authenticated: true});
  }
}

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
