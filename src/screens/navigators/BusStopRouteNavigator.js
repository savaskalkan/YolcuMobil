import { createStackNavigator, createAppContainer } from "react-navigation";
import BusStopRoute from '../BusStopRoute'
import WhereIsServiceModalScreen from '../modals/WhereIsServiceModalScreen'
import PassengersModalScreen from '../modals/Passengers/PassengersModalScreen'

const RootStack = createStackNavigator(
  {
    Main: {
      screen: BusStopRoute,
    },
    BusStopRouteModal: {
      screen: WhereIsServiceModalScreen,
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