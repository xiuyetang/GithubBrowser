'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Component,
  ActivityIndicatorIOS
} = React;

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS animating={true} size="large" style={styles.loader} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

module.exports = Loading;
