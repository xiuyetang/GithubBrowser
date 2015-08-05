'use strict';

var React = require('react-native');
var AuthService = require('./AuthService');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Component,
  ActivityIndicatorIOS
} = React;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showProgress: false
    };
  }

  render() {
    var errorCtrl = <View />;
    if(!this.state.success && this.state.badCredentials) {
      errorCtrl = <Text style={styles.error}>
        That username and password combination did not work
      </Text>;
    }

    if(!this.state.success && this.state.unknownError) {
      errorCtrl = <Text style={styles.error}>
        We experienced an unexpected issue
      </Text>;
    }

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('image!Octocat')} />
        <Text style={styles.heading}>
          Github Browser
        </Text>
        <TextInput
          onChangeText={(text) => this.setState({username: text})}
          style={styles.input}
          placeholder="Github username" />
        <TextInput
          onChangeText={(text) => this.setState({password: text})}
          style={styles.input}
          placeholder="Github password"
          secureTextEntry="true" />
        <TouchableHighlight
          onPress={this.onLoginPressed.bind(this)}
          style={styles.button}>
          <Text style={styles.buttonText}>
            Log in
          </Text>
        </TouchableHighlight>

        {errorCtrl}

        <ActivityIndicatorIOS
          animating={this.state.showProgress}
          size="large"
          style={styles.loader} />
      </View>
    );
  }

  onLoginPressed() {
    console.log('attempting to log in with username: ' + this.state.username);
    this.setState({showProgress: true});

    AuthService.login({
      username: this.state.username,
      password: this.state.password
    }, (results) => {
      this.setState(Object.assign({
        showProgress: false
      }, results));

      if(results.success && this.props.onLogin) {
        this.props.onLogin();
      }
    });
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  logo: {
    width: 66,
    height: 55
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec',
    color: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48bbec',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center',
    borderRadius: 5
  },
  buttonText: {
    fontSize: 22,
    color: '#fff',
    alignSelf: 'center'
  },
  loader: {
    marginTop: 10
  },
  error: {
    color: 'red',
    paddingTop: 10,
    fontWeight: 'bold'
  }
});

module.exports = Login;
