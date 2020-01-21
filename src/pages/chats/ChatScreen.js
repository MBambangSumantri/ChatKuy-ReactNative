import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import * as firebase from 'firebase';
import {ScrollView} from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/MaterialIcons';

export default class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {
        name: props.navigation.getParam('name'),
        uid: props.navigation.getParam('uid'),
      },
      textMessage: '',
      messageList: '',
    };
  }

  componentDidMount() {
    const Users = firebase.auth().currentUser;
    firebase
      .database()
      .ref('messages')
      .child(Users.uid)
      .child(this.state.person.uid)
      .on('child_added', value => {
        this.setState(prevState => {
          return {
            messageList: [...prevState.messageList, value.val()],
          };
        });
      });
  }

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  convertTime = time => {
    let d = new Date(time);
    let c = new Date();

    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    if (c.getDay() !== d.getDay()) {
      result =
        d.getDay() +
        '-' +
        d.getMonth() +
        '-' +
        d.getFullYear() +
        '   (' +
        result +
        ')';
    }
    return result;
  };

  sendMessage = async () => {
    if (this.state.textMessage.length > 0) {
      const Users = firebase.auth().currentUser;
      let msgId = firebase
        .database()
        .ref('messages')
        .child(Users.uid)
        .child(this.state.person.uid)
        .push().key;
      let updates = {};
      let message = {
        message: this.state.textMessage,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: Users.uid,
      };
      updates[
        'messages/' + Users.uid + '/' + this.state.person.uid + '/' + msgId
      ] = message;
      updates[
        'messages/' + this.state.person.uid + '/' + Users.uid + '/' + msgId
      ] = message;
      firebase
        .database()
        .ref()
        .update(updates);
      this.setState({textMessage: ''});
    }
  };

  renderRow = ({item}) => {
    const Users = firebase.auth().currentUser;
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '60%',
          alignSelf: item.from === Users.uid ? 'flex-end' : 'flex-start',
          backgroundColor: item.from === Users.uid ? '#344040' : '#BFB9BD',
          borderRadius: 5,
          marginBottom: 10,
        }}>
        <Text style={{color: '#fff', padding: 7, fontSize: 16}}>
          {item.message}
        </Text>
        <Text style={{color: '#eee', padding: 3, fontSize: 12}}>
          {this.convertTime(item.time)}
        </Text>
      </View>
    );
  };

  render() {
    let {height, width} = Dimensions.get('window');
    return (
      <>
        <ScrollView>
          <FlatList
            style={{padding: 10, height: height * 0.8}}
            data={this.state.messageList}
            renderItem={this.renderRow}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <View style={styles.input}>
            <TextInput
              value={this.state.textMessage}
              placeholder="Type message...."
              onChangeText={this.handleChange('textMessage')}
            />
          </View>
          <View>
            <TouchableOpacity onPress={this.sendMessage}>
              <Icons name="send" size={40} />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    padding: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '85%',
    marginLeft: 10,
    borderRadius: 5,
  },
});
