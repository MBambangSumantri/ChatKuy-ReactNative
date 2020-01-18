import React from 'react';
import {View, Image} from 'react-native';
import * as firebase from 'firebase';

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      interval: '',
    };
  }
  componentDidMount() {
    this._bootstrapAsync();
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'App' : 'Auth');
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let timer = setInterval(() => {
      this.props.navigation.navigate('Auth');
    }, 5000);

    this.setState({
      interval: timer,
    });
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.viewStyles}>
        <Image
          source={require('../../public/images/splashscreen.png')}
          style={[styles.boxing]}
        />
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  boxing: {
    width: 350,
    height: 100,
    // alignItems: 'flex-start',
  },
};

export default AuthLoadingScreen;
