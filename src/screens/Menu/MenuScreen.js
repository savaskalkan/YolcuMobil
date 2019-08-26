import {
  createDrawerNavigator,
  createAppContainer,
} from 'react-navigation';
import {
  MainScreenStackNavigator,
  ExitScreenStackNavigator,
  ChangePasswordScreenStackNavigator
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
      screen: ChangePasswordScreenStackNavigator,
      navigationOptions: {
        drawerLabel: menuTitle.ChangePasswordScreenTitle,
      },
    },
    Screen3: {
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