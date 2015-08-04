/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS
} = React;

var Login = require('./Login');
var AuthService = require('./AuthService');

var GithubBrowser = React.createClass({
  getInitialState: function() {
    return {
      authenticated: false,
      checkingAuth: true
    };
  },

  componentDidMount: function() {
    AuthService.getAuthInfo((err, authInfo) => {
      this.setState({
        checkingAuth: false,
        authenticated: authInfo !== undefined
      });
    }); 
  },

  render: function() {
    if(this.state.checkingAuth) {
      return (
        <View style={styles.container}>
          <ActivityIndicatorIOS animating={true} size="large" style={styles.loader} />
        </View>
      );
    }

    if(this.state.authenticated) {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Authenticated
          </Text>
        </View>
      );
    } else {
      return (
        <Login onLogin={this.onLogin} />
      );
    }
  },

  onLogin: function() {
    this.setState({authenticated: true});
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
