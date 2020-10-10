import React, { Component } from "react";
import {
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  AsyncStorage,
  Image
} from "react-native";
import { Metrics, Images } from "../../../themes";
import styles from "./style";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions'
import { LoginService } from '../../services'
import { UpdateNotificationTokenModel } from '../../models';
import { Card, CardItem, Body, Button } from 'native-base';
import { ScrollView } from "react-native-gesture-handler";

var StorageKeys = require('../../data/StorageKeys.json');
var navigateKeys = require('../../data/NavigateKeys.json');
var menuTitle = require('../../data/MenuTitles.json');

var flatlistDataSource = [
  {
    key: 1,
    title: menuTitle.CarDriverScreenTitle,
    uri: require('../../../assets/1.png')
  },
  {
    key: 2,
    title: menuTitle.BusStopRouteScreenTitle,
    uri: require('../../../assets/2.png')
  },
  {
    key: 3,
    title: menuTitle.WhereIsServiceScreenTitle,
    uri: require('../../../assets/3.png')
  },
  {
    key: 4,
    title: menuTitle.GotOnOffScreenTitle,
    uri: require('../../../assets/4.png')
  }
];

export default class MainScreen extends Component {
  loginService = new LoginService();

  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: ""
    }

    this.updateNotificationToken = this.updateNotificationToken.bind(this);
  }

  async componentWillMount() {
    AsyncStorage.getItem(StorageKeys.PassengerDetailKey)
      .then(value => {
        var parsedUserDetail = JSON.parse(value);
        let passengerId = parsedUserDetail["PassengerId"];

        this.registerForPushNotifications(passengerId);
      })
  }

  componentDidMount() {
    AsyncStorage.getItem(StorageKeys.PassengerDetailKey)
      .then(value => {
        var parsedUserDetail = JSON.parse(value);
        this.setState({
          firstName: parsedUserDetail["FirstName"],
          lastName: parsedUserDetail["LastName"]
        })
      })
  }

  _renderCard = () => {
    const compoArray = []
    flatlistDataSource.map(item => {
      const component = (
        <TouchableOpacity onPress={() => this.onFlatListPress(item.key)}>
          <Card style={{ height: 90, padding: 5 }}>
            <View style={{ flex: 1, flexDirection: item.key % 2 ? 'row' : 'row-reverse', justifyContent: 'space-between' }}>
              <Image style={{ height: 75, width: 75, marginLeft: 10 }} source={item.uri} />
              <Text style={{ fontWeight: 'bold', color: 'gray', padding: 10, marginLeft: 10 }}>
                {item.title}
              </Text>
            </View>
          </Card>
        </TouchableOpacity>
      )
      compoArray.push(component)
    })
    return compoArray

  }

  render() {
    AsyncStorage.setItem(StorageKeys.WhereIsServiceTimerEnableKey, "false");

    if (Platform.OS == "android") {
      StatusBar.setTranslucent(true);
    }

    return (
      <ImageBackground imageStyle={{ opacity: 0.05 }} source={require('../../../assets/pattern.png')} style={{ width: '100%', height: '100%', }}>
        <View style={styles.MainBG}>
          <Text style={{ alignSelf: 'center', color: 'gray', padding: 5, marginTop: 10 }}>Hoşgeldiniz</Text>
          <Text style={{ alignSelf: 'center', color: 'gray', padding: 5, fontSize: 16 }}>{this.state.firstName + " " + this.state.lastName}</Text>
          <Text style={{ alignSelf: 'center', color: 'gray', padding: 5, fontSize: 11, marginTop: 10 }}>Seçiminizi yapabilirsiniz</Text>
          <ScrollView contentContainerStyle={{ width: '80%', alignSelf: 'center' }}>
            {
              this._renderCard()
            }
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }

  //methods  
  onFlatListPress = key => {
    let navigateKey = (key == 1) ? navigateKeys.CarDriverKey :
      (key == 2) ? navigateKeys.BusStopRouteKey :
        (key == 3) ? navigateKeys.WhereIsServiceKey :
          (key == 4) ? navigateKeys.GotOnOffKey : "";

    this.props.navigation.navigate(navigateKey);
  };

  async registerForPushNotifications(passengerId) {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        return;
      }
    }

    const notificationToken = await Notifications.getExpoPushTokenAsync();

    this.updateNotificationToken(passengerId, notificationToken);
  }

  updateNotificationToken(passengerId, notificationToken) {
    var model = new UpdateNotificationTokenModel();
    model.PassengerId = passengerId;
    model.NotificationToken = notificationToken;

    this.loginService.updateNotificationToken(model).then(responseJson => {
      if (!responseJson.IsSuccess) {
        Alert.alert(Constant.ErrorText, responseJson.ExceptionMsg);
      }
    }).catch((error) => {
      console.log(error);
    });
  }
}
