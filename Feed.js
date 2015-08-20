'use strict';

var React = require('react-native');
var {
  Component,
  Text,
  ListView,
  View,
  ActivityIndicatorIOS,
  Image,
  TouchableHighlight
} = React;

var AuthService = require('./AuthService');
var FeedItemDetail = require('./FeedItemDetail');
var moment = require('moment');

class Feed extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      dataSource: ds,
      showProgress: true
    };
  }

  componentDidMount() {
    this.fetchFeed();
  }

  fetchFeed() {
    AuthService.getAuthInfo((err, authInfo) => {
      var url = 'https://api.github.com/users/'
        + authInfo.user.login
        + '/received_events';

      fetch(url, { headers: authInfo.headers })
      .then((response) => response.json())
      .then((responseData) => {
        var feedItems = responseData.filter((ev) => {
          return true;//ev.type === 'PushEvent';
        });

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(feedItems),
          showProgress: false
        });
      });
    });
  }

  render() {
    if(this.state.showProgress) {
      return this.renderLoading();
    }
    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start'
      }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
      </View>
    );
  }

  renderLoading() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center'
      }}>
        <ActivityIndicatorIOS
          style={{alignSelf: 'center'}}
          animating={true}
          size="large" />
      </View>
    );
  }

  renderRow(rowData) {
    console.log(rowData);
    return (
      <TouchableHighlight
        onPress={() => this.pressRow(rowData)}
        underlayColor='#ddd'
      >
        <View style={{
          flex: 1,
          flexDirection: 'row',
          padding: 20,
          alignItems: 'center',
          borderColor: '#D7D7D7',
          borderBottomWidth: 1
        }}>
          <Image source={{uri: rowData.actor.avatar_url}}
            style={{
              height: 36,
              width: 36,
              borderRadius: 18
            }} />

          {this.renderRowDetails(rowData)}
        </View>
      </TouchableHighlight>
    );
  }

  renderRowDetails(rowData) {
    return (
      <View style={{
        paddingLeft: 20
      }}>
        <Text style={{}}>
          {moment(rowData.created_at).fromNow()}
        </Text>
        <Text style={{}}>
          {rowData.type}
        </Text>
        <Text style={{}}>
          {rowData.actor.login}
        </Text>
        <Text style={{fontWeight: '600' }}>
          {rowData.repo.name}
        </Text>
      </View>
    );
  }

  pressRow(rowData) {
    this.props.navigator.push({
      title: rowData.actor.login,
      component: FeedItemDetail,
      passProps: {
        pushEvent: rowData
      }
    });
  }
}

module.exports = Feed;
