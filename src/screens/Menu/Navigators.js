import React from 'react';
import {createStackNavigator} from 'react-navigation';
import NavigationDrawerStructure from './NavigationDrawerStructure'
import MainScreen from '../MainScreen'
import ExitScreen from '../ExitScreen'
import ChangePasswordScreen from '../ChangePassword'

var backgroundColor="#373737";
var headerTintColor="#fff";

export const MainScreenStackNavigator = createStackNavigator({
    Main: {
      screen: MainScreen,
      navigationOptions: ({ navigation }) => ({
        title: "",
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        headerTintColor: headerTintColor,
      }),
    },
  });

export const ChangePasswordScreenStackNavigator = createStackNavigator({
    Exit: {
      screen: ChangePasswordScreen,
      navigationOptions: ({ navigation }) => ({
        title:"Şifre Değiştirme",
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        headerTintColor: '#fff',
      }),
    },
    });

export const ExitScreenStackNavigator = createStackNavigator({
  Exit: {
    screen: ExitScreen,
    navigationOptions: ({ navigation }) => ({
      title: "",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: backgroundColor,
      },
      headerTintColor: '#fff',
    }),
  },
  });