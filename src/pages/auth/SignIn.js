import React, {Component} from 'react';
import {OutlinedTextField} from 'react-native-material-textfield';
import {View, ScrollView, TouchableHighlight} from 'react-native';
import {Container, Text, Button} from 'native-base';
import s from '../../public/styles/login-register';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: null,
  };

  handleLogin = () => {
    const {email, password} = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({errorMessage: error.message}));
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
                  Hi,<Text style={[s.headerHi, s.secondaryColor]}>Gan!</Text>
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
