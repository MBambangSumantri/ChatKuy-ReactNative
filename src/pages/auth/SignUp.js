import React, {Component} from 'react';
import {OutlinedTextField} from 'react-native-material-textfield';
import {View, ScrollView, TouchableHighlight} from 'react-native';
import {Container, Text, Button} from 'native-base';
import s from '../../public/styles/login-register';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    errorMessage: null,
  };

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(userCredentials => {
        return userCredentials.user.updateProfile({
          displayName: this.state.name,
        });
      })
      .catch(error => this.setState({errorMessage: error.message}));
  };
  render() {
    return (
      <Container style={s.centerRotate}>
        <ScrollView>
          <View style={s.container}>
            <View style={[s.px4, s.jcCenter]}>
              <View>
                <Text style={[s.header]}>Sign Up</Text>
                <Text style={[s.headerHi]}>
                  Hi,
                  <Text style={[s.headerHi, s.secondaryColor]}>Welcome!</Text>
                </Text>
                <Text style={[s.headerPlease]}>please sign up to continue</Text>
                <View style={s.errorMessage}>
                  {this.state.errorMessage && (
                    <Text style={s.error}>{this.state.errorMessage}</Text>
                  )}
                </View>
                <View style={s.section}>
                  <OutlinedTextField
                    label="Name"
                    autoCapitalize="none"
                    onChangeText={name => this.setState({name})}
                    value={this.state.name}
                  />
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
                    label="Password"
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                  />
                </View>
                <View style={[s.sectionButton]}>
                  <Button style={s.buttonSignUp} onPress={this.handleSignUp}>
                    <Text style={s.textButtonSignUp}>
                      Sign Up{' '}
                      <Ionicons
                        size={25}
                        color={'white'}
                        name="ios-arrow-round-forward"
                      />
                    </Text>
                  </Button>
                </View>
                <View style={[s.section, s.register, s.flexCenter]}>
                  <Text>Already have an account? </Text>
                  <TouchableHighlight
                    onPress={() => this.props.navigation.navigate('SignIn')}>
                    <Text style={s.tertiaryColor}> Login</Text>
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

export default SignUp;
