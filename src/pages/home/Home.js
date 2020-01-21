import React from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import * as firebase from 'firebase';
import {ScrollView} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import logoPerson from '../../public/images/avatar.jpg';

export default class HomeScreen extends React.Component {
  state = {
    users: [],
    loading: true,
  };

  componentDidMount() {
    let dbRef = firebase.database().ref('users');
    const Users = firebase.auth().currentUser;
    // console.log('User User',User)
    // console.log('UserDIsplay',User.displayName)
    dbRef.on('child_added', val => {
      let person = val.val();
      person.uid = val.key;
      if (person.uid === Users.uid) {
        Users.name = person.name;
      } else if (person.uid === Users.uid) {
        Users.email = person.name;
      } else {
        this.setState(prevState => {
          return {
            users: [...prevState.users, person],
            loading: false,
          };
        });
      }
    });
  }

  renderRow = ({item}) => {
    return (
      <TouchableOpacity
        style={{padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1}}
        onPress={() => this.props.navigation.navigate('Chat', item)}>
        <View style={styles.profileContainer}>
          <Image source={logoPerson} style={styles.profileImage} />
          <View style={styles.column}>
            <Text style={styles.profileName}>{item.name}</Text>
            <Text style={styles.profileEmail}>{item.email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <ScrollView>
        <FlatList
          data={this.state.users}
          renderItem={this.renderRow}
          keyExtractor={item => item.uid}
        />
        <Spinner visible={this.state.loading} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 6,
    marginBottom: 8,
  },
  profileName: {
    marginTop: 5,
    marginLeft: 10,
    fontSize: 20,
  },
  profileEmail: {
    marginLeft: 10,
  },
});
