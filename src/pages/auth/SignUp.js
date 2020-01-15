import React, {Component} from 'react';
import {OutlinedTextField} from 'react-native-material-textfield';
import {View, ScrollView, TouchableHighlight} from 'react-native';
import {Container, Text, Button} from 'native-base';
import s from '../../public/styles/login-register';
import Ionicons from 'react-native-vector-icons/Ionicons';

class SignUp extends Component {
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
                <View style={s.section}>
                  <OutlinedTextField label="Name" />
                </View>
                <View style={s.section}>
                  <OutlinedTextField label="Email" />
                </View>
                <View style={s.section}>
                  <OutlinedTextField label="Password" />
                </View>
                <View style={[s.sectionButton]}>
                  <Button
                    style={s.buttonSignUp}
                    onPress={() => this.props.navigation.navigate('SignIn')}>
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
