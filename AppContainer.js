'use strict';

var React = require('react-native');
var Feed = require('./Feed');

var {
  StyleSheet,
  Text,
  View,
  Component,
  TabBarIOS
} = React;

var tabs = {
  feed: 'feed',
  search: 'search'
};

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: tabs.feed
    };
  }

  render() {
    return (
      <TabBarIOS style={styles.container}>
      	<TabBarIOS.Item
          title="Feed"
          selected={this.state.selectedTab === tabs.feed}
          //icon={require('image!inbox')}
          onPress={() => this.setState({selectedTab: tabs.feed})}
        >
          <Feed />
        </TabBarIOS.Item>
      	<TabBarIOS.Item
          title="Search"
          selected={this.state.selectedTab === tabs.search}
          //icon={require('image!search')}
          onPress={() => this.setState({selectedTab: tabs.search})}
        >
          <Text style={styles.welcome}>Search Tab</Text>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

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
  }
});

module.exports = AppContainer;
