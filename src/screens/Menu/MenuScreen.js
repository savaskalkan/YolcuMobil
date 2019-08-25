import {
  createDrawerNavigator,
  createAppContainer,
} from 'react-navigation';
import {
  MainScreenStackNavigator,
  ExitScreenStackNavigator
} from './Navigators'

var menuTitle=require('./../../data/MenuTitles.json');

const MenuScreen = createDrawerNavigator({
  Screen1: {
    screen: MainScreenStackNavigator,
    navigationOptions: {
      drawerLabel: menuTitle.MainScreenTitle,
    },
  },
  Screen2: {
    screen: ExitScreenStackNavigator,
    navigationOptions: {
      drawerLabel: menuTitle.ExitScreenTitle,
    },
  },
},
{
  drawerType:'back',
  // drawerBackgroundColor:'#373737'
});
 
export default createAppContainer(MenuScreen);