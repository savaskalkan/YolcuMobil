import {
  createDrawerNavigator,
  createAppContainer,
} from 'react-navigation';
import {
  MainScreenStackNavigator,
  ExitScreenStackNavigator,
  ChangePasswordScreenStackNavigator,
  BusStopRouteScreenStackNavigator,
  CarDriverScreenStackNavigator,
  WhereIsServiceScreenStackNavigator,
  GotOnOffScreenStackNavigator
} from './Navigators'

var menuTitle=require('./../../data/MenuTitles.json');

const MenuScreen = createDrawerNavigator(
  {
    Screen1: {
      screen: MainScreenStackNavigator,
      navigationOptions: {
        drawerLabel: menuTitle.MainScreenTitle,
      },
    },
    Screen2: {
      screen: CarDriverScreenStackNavigator,
      navigationOptions: {
        drawerLabel: menuTitle.CarDriverScreenTitle,
      },
    },
    Screen3: {
      screen: BusStopRouteScreenStackNavigator,
      navigationOptions: {
        drawerLabel: menuTitle.BusStopRouteScreenTitle,
      },
    },
    Screen4: {
      screen: WhereIsServiceScreenStackNavigator,
      navigationOptions: {
        drawerLabel: menuTitle.WhereIsServiceScreenTitle,
      },
    },
    Screen5: {
      screen: GotOnOffScreenStackNavigator,
      navigationOptions: {
        drawerLabel: menuTitle.GotOnOffScreenTitle,
      },
    },
    Screen6: {
      screen: ChangePasswordScreenStackNavigator,
      navigationOptions: {
        drawerLabel: menuTitle.ChangePasswordScreenTitle,
      },
    },
    Screen7: {
      screen: ExitScreenStackNavigator,
      navigationOptions: {
        drawerLabel: menuTitle.ExitScreenTitle,
      },
    },
  },
  {
    drawerType:'slide',
    // drawerBackgroundColor:'#373737'
  }
);
 
export default createAppContainer(MenuScreen);