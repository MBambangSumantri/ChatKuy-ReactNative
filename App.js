import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import from auth
import AuthLoading from './src/pages/auth/AuthLoading';
import SignInScreen from './src/pages/auth/SignIn';
import SignUpScreen from './src/pages/auth/SignUp';

// import from home
import HomeScreen from './src/pages/home/Home';
import ProfileScreen from './src/pages/home/Profile';
import MapsScreen from './src/pages/home/Maps';

import ChatScreen from './src/pages/chats/ChatScreen';

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyCako2LK4vKFgRME9sFxlJ76ib-80lW3Fc',
  authDomain: 'chatmap-785dc.firebaseapp.com',
  databaseURL: 'https://chatmap-785dc.firebaseio.com',
  projectId: 'chatmap-785dc',
  storageBucket: 'chatmap-785dc.appspot.com',
  messagingSenderId: '220595875082',
  appId: '1:220595875082:web:1fdf259b5cbf2bc9e8def3',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const highestTimeoutId = setTimeout(() => ';');
for (let i = 0; i < highestTimeoutId; i++) {
  clearTimeout(i);
}

const HomeStack = createStackNavigator({Home: HomeScreen});
const MapsStack = createStackNavigator({Maps: MapsScreen});
const ProfileStack = createStackNavigator({
  Home: {
    screen: ProfileScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});
const AuthStack = createStackNavigator({
  SignIn: {
    screen: SignInScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const RootStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    Maps: MapsStack,
    Profile: ProfileStack,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-chatboxes';
        } else if (routeName === 'Maps') {
          iconName = 'ios-pin';
        } else if (routeName === 'Profile') {
          iconName = 'ios-contact';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#009688',
      inactiveTintColor: 'gray',
    },
  },
);

const App = createAppContainer(RootStack);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      Auth: AuthStack,
      App,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
