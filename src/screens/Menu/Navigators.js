import React from 'react';
import {createStackNavigator} from 'react-navigation';
import NavigationDrawerStructure from './NavigationDrawerStructure'
import MainScreen from '../MainScreen'
import ExitScreen from '../ExitScreen'
import ChangePasswordScreen from '../ChangePassword'
import BusStopRouteScreen from '../BusStopRoute'
import CarDriverScreen from '../CarDriver'
import WhereIsServiceScreen from '../WhereIsService'

var backgroundColor="#373737";
var headerTintColor="#fff";
var menuTitle=require('./../../data/MenuTitles.json');

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

  export const BusStopRouteScreenStackNavigator = createStackNavigator({
    BusStopRoute: {
        screen: BusStopRouteScreen,
        navigationOptions: ({ navigation }) => ({
          title:menuTitle.BusStopRouteScreenTitle,
          headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
          headerStyle: {
            backgroundColor: backgroundColor,
          },
          headerTintColor: '#fff',
        }),
      },
  });

  export const CarDriverScreenStackNavigator = createStackNavigator({
    CarDriver: {
        screen: CarDriverScreen,
        navigationOptions: ({ navigation }) => ({
          title:menuTitle.CarDriverScreenTitle,
          headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
          headerStyle: {
            backgroundColor: backgroundColor,
          },
          headerTintColor: '#fff',
        }),
      },
  });

  export const WhereIsServiceScreenStackNavigator = createStackNavigator({
    WhereIsService: {
        screen: WhereIsServiceScreen,
        navigationOptions: ({ navigation }) => ({
          title:menuTitle.WhereIsServiceScreenTitle,
          headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
          headerStyle: {
            backgroundColor: backgroundColor,
          },
          headerTintColor: '#fff',
        }),
      },
  });

export const ChangePasswordScreenStackNavigator = createStackNavigator({
  ChangePassword: {
      screen: ChangePasswordScreen,
      navigationOptions: ({ navigation }) => ({
        title:menuTitle.ChangePasswordScreenTitle,
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