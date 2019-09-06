import { createStackNavigator, createAppContainer } from "react-navigation";
import BusStopRoute from '../BusStopRoute'
import WhereIsServiceModalScreen from '../modals/WhereIsServiceModalScreen'

const RootStack = createStackNavigator(
  {
    Main: {
      screen: BusStopRoute,
    },
    BusStopRouteModal: {
      screen: WhereIsServiceModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default createAppContainer(RootStack);