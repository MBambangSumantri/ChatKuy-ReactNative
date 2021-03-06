import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from 'react-native-dotenv';

// import from auth
import AuthLoading from './src/pages/auth/AuthLoading';
import SignInScreen from './src/pages/auth/SignIn';
import SignUpScreen from './src/pages/auth/SignUp';

// import from home
import HomeScreen from './src/pages/home/Home';
import ProfileScreen from './src/pages/home/Profile';
import MapsScreen from './src/pages/home/Maps';

import ChatScreen from './src/pages/chats/ChatScreen';
console.disableYellowBox = true;

// import * as firebase from 'firebase';
const firebase = require('firebase');

var firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const HomeStack = createStackNavigator({
  FriendList: HomeScreen,
  Chat: ChatScreen,
});
const MapsStack = createStackNavigator({
  Maps: {
    screen: MapsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});
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
    Chat: HomeStack,
    Maps: MapsStack,
    Profile: ProfileStack,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Chat') {
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
