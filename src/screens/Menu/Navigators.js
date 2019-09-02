import React from 'react';
import {createStackNavigator} from 'react-navigation';
import NavigationDrawerStructure from './NavigationDrawerStructure'
import MainScreen from '../MainScreen'
import ExitScreen from '../ExitScreen'
import ChangePasswordScreen from '../ChangePassword'
import BusStopRouteScreen from '../BusStopRoute'
import CarDriverScreen from '../CarDriver'
import WhereIsServiceNavigator from '../navigators/WhereIsServiceNavigator'
import {  Button } from 'react-native';
import { Colors } from "../../../themes";
import { StyleSheet,TouchableOpacity,Text } from 'react-native';

var headerTintColor="#fff";
var menuTitle=require('./../../data/MenuTitles.json');

export const MainScreenStackNavigator = createStackNavigator({
    Main: {
      screen: MainScreen,
      navigationOptions: ({ navigation }) => ({
        title: "",
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: Colors.softBlack,
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
            backgroundColor: Colors.softBlack,
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
            backgroundColor: Colors.softBlack,
          },
          headerTintColor: '#fff',
        }),
      },
  });

  export const WhereIsServiceScreenStackNavigator = createStackNavigator({
    WhereIsService: {
        screen: WhereIsServiceNavigator,
        navigationOptions: ({ navigation }) => ({
          title:  menuTitle.WhereIsServiceScreenTitle, 
          headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
          headerStyle: {
            backgroundColor: Colors.softBlack,
          },
          headerTintColor: '#fff',
          headerRight: (
            <TouchableOpacity
                      style={{backgroundColor:Colors.softBlack}}
                      onPress={() => navigation.navigate('WhereIsServiceModal')}
                      underlayColor='#fff'>
                      <Text style={{
                        color:'#fff',
                        textAlign:'center',
                        paddingLeft : 10,
                        paddingRight : 10
                    }}>FILTRELE</Text>
            </TouchableOpacity>
          ),
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
          backgroundColor: Colors.softBlack,
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
        backgroundColor: Colors.softBlack,
      },
      headerTintColor: '#fff',
    }),
  },
  });