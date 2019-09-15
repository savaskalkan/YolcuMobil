import { createStackNavigator, createAppContainer } from "react-navigation";
import BusStopRoute from '../BusStopRoute'
import BusStopServiceModalScreen from '../modals/BusStopServiceModalScreen'
import PassengersModalScreen from '../modals/Passengers/PassengersModalScreen'

const RootStack = createStackNavigator(
  {
    Main: {
      screen: BusStopRoute,
    },
    BusStopRouteModal: {
      screen: BusStopServiceModalScreen,
    },
    PassengersModal: {
      screen: PassengersModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default createAppContainer(RootStack);