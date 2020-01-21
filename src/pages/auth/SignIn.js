import React, {Component} from 'react';
import {OutlinedTextField} from 'react-native-material-textfield';
import {
  View,
  ScrollView,
  TouchableHighlight,
  PermissionsAndroid,
  ToastAndroid,
  Platform,
} from 'react-native';
import {Container, Text, Button} from 'native-base';
import s from '../../public/styles/login-register';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';
import Geolocation from 'react-native-geolocation-service';
// import AsyncStorage from '@react-native-community/async-storage';

class SignIn extends Component {
  // state = {
  //   email: '',
  //   password: '',
  //   errorMessage: null,
  // };

  // handleLogin = () => {
  //   const {email, password} = this.state;

  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .catch(error => this.setState({errorMessage: error.message}));
  // };
  constructor(props) {
    super(props);
    this.isMounted = false;
    this.state = {
      email: '',
      password: '',
      errorMessage: null,
    };
  }

  componentDidMount = async () => {
    this.isMounted = true;
    await this.getLocation();
  };

  componentWillUnmount() {
    this.isMounted = false;
    Geolocation.clearWatch();
    Geolocation.stopObserving();
  }

  //Get location permissions
  hasLocationPermission = async () => {
    if (
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.version < 23)
    ) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location Permission Denied By User',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location Permissions Revoked By User',
        ToastAndroid.LONG,
      );
    }
    return false;
  };

  //Set Location
  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();
    if (!hasLocationPermission) {
      return;
    }

    this.setState({loading: true}, () => {
      Geolocation.getCurrentPosition(
        position => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            loading: false,
          });
        },
        error => {
          this.setState({errorMessage: error});
        },
        {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: 8000,
          distanceFilter: 50,
          forceRequestLocation: true,
        },
      );
    });
  };

  handleLogin = async () => {
    const {email, password} = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async response => {
        firebase
          .database()
          .ref('/users/' + response.user.uid)
          .update({
            status: 'Online',
            latitude: this.state.latitude || null,
            longitude: this.state.longitude || null,
          });

        ToastAndroid.show('Login success', ToastAndroid.LONG);
        // await AsyncStorage.setItem('userid', response.user.uid);
        // await AsyncStorage.setItem('user', JSON.stringify(response.user));
        this.props.navigation.navigate('App');
      })
      .catch(error => {
        this.setState({
          errorMessage: error.message,
          email: '',
          password: '',
        });
        ToastAndroid.show(this.state.errorMessage, ToastAndroid.LONG);
      });
  };
  render() {
    return (
      <Container style={s.centerRotate}>
        <ScrollView>
          <View style={s.container}>
            <View style={[s.px4, s.jcCenter]}>
              <View>
                <Text style={[s.header]}>Login Here</Text>
                <Text style={[s.headerHi]}>
                  Hi, <Text style={[s.headerHi, s.secondaryColor]}>Gan!</Text>
                </Text>
                <Text style={[s.headerPlease]}>please sign in to continue</Text>
                <View style={s.errorMessage}>
                  {this.state.errorMessage && (
                    <Text style={s.error}>{this.state.errorMessage}</Text>
                  )}
                </View>
                <View style={s.section}>
                  <OutlinedTextField
                    label="Email"
                    autoCapitalize="none"
                    onChangeText={email => this.setState({email})}
                    value={this.state.email}
                  />
                </View>
                <View style={s.section}>
                  <OutlinedTextField
                    secureTextEntry
                    autoCapitalize="none"
                    label="Password"
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                  />
                </View>
                <View style={[s.sectionButton]}>
                  <Button style={s.buttonSignIn} onPress={this.handleLogin}>
                    <Text style={[s.textButtonSignIn]}>
                      Sign In{' '}
                      <Ionicons
                        size={25}
                        color={'white'}
                        name="ios-arrow-round-forward"
                      />
                    </Text>
                  </Button>
                </View>
                <View style={[s.section, s.register, s.flexCenter]}>
                  <Text>Don't have an account? </Text>
                  <TouchableHighlight
                    onPress={() => this.props.navigation.navigate('SignUp')}>
                    <Text style={s.tertiaryColor}> Sign Up</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export default SignIn;
