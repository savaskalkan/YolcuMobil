import React from 'react';
import {
  Text,
  AsyncStorage,
  View,
  Alert
} from 'react-native';
import {Notifications } from 'expo';
import * as Permissions from 'expo-permissions'
import {LoginService} from '../services'
import {UpdateNotificationTokenModel} from '../models';

var StorageKeys=require('../data/StorageKeys.json');
var NavigateKeys=require('../data/NavigateKeys.json');

export default class MainScreen extends React.Component {
  loginService = new LoginService();

  constructor(props) {
    super(props);

    this.updateNotificationToken=this.updateNotificationToken.bind(this);
  }

  async componentWillMount(){
    AsyncStorage.getItem(StorageKeys.PassengerDetailKey)
    .then( value => {    
      var parsedUserDetail= JSON.parse(value);
       let passengerId=parsedUserDetail["PassengerId"];

       this.registerForPushNotifications(passengerId);
    })    
  }

  render() {
    return (
      <View>
        <Text>Main</Text>
      </View>
    );
  }

  //methods
  async registerForPushNotifications(passengerId) {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        return;
      }
    }

    const notificationToken = await Notifications.getExpoPushTokenAsync();
    
    this.updateNotificationToken(passengerId,notificationToken);
  }

  updateNotificationToken(passengerId,notificationToken){      
    var model=new UpdateNotificationTokenModel();
    model.PassengerId=passengerId;
    model.NotificationToken=notificationToken;

    this.loginService.updateNotificationToken(model).then(responseJson => {
        if (!responseJson.IsSuccess) {             
            Alert.alert(Constant.ErrorText, responseJson.ExceptionMsg);        
        }
    }).catch((error) => {
        console.log(error);
    });
  }
}