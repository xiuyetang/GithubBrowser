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

var moment = require('moment');

class FeedItemDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{
        flex: 1,
        paddingTop: 80,
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        <Image
          source={{uri: this.props.pushEvent.actor.avatar_url}}
          style={{
            height: 120,
            width: 120,
            borderRadius: 60
          }} />
        <Text style={{
          paddingTop: 20,
          paddingBottom: 20,
          fontSize: 20
        }}>
          {moment(this.props.pushEvent.created_at).fromNow()}
        </Text>
        <Text>{this.props.pushEvent.actor.login}</Text>
        <Text>{this.props.pushEvent.repo.name}</Text>
      </View>
    );
  }
}

module.exports = FeedItemDetail;
