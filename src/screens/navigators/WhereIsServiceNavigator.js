import { createStackNavigator, createAppContainer } from "react-navigation";
import WhereIsService from '../WhereIsService'
import WhereIsServiceModalScreen from '../modals/WhereIsServiceModalScreen'

const RootStack = createStackNavigator(
  {
    Main: {
      screen: WhereIsService,
    },
    WhereIsServiceModal: {
      screen: WhereIsServiceModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default createAppContainer(RootStack);