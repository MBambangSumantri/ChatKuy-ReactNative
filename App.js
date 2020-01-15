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

const HomeStack = createStackNavigator({Home: HomeScreen});
const ProfileStack = createStackNavigator({Home: ProfileScreen});
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
    Profile: ProfileStack,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-home';
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
