import React from 'react';
import {
  AsyncStorage,
  Alert,
  StyleSheet
} from 'react-native';
import {Notifications } from 'expo';
import * as Permissions from 'expo-permissions'
import {LoginService} from '../services'
import {UpdateNotificationTokenModel} from '../models';
import { Container, Content, Button, Text } from 'native-base';

var StorageKeys=require('../data/StorageKeys.json');
var navigateKeys=require('./../data/NavigateKeys.json');
var menuTitle=require('./../data/MenuTitles.json');

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
      <Container style={{paddingTop:50}}>
        <Content >
            <Button rounded block info style={styles.Button}
              onPress={()=>this.props.navigation.navigate(navigateKeys.CarDriverKey)}>
              <Text>{menuTitle.CarDriverScreenTitle}</Text>
            </Button>
            <Button rounded block info style={styles.Button}
              onPress={()=>this.props.navigation.navigate(navigateKeys.BusStopRouteKey)}>
              <Text>{menuTitle.BusStopRouteScreenTitle}</Text>
            </Button>
            <Button rounded block info style={styles.Button}
              onPress={()=>this.props.navigation.navigate(navigateKeys.WhereIsServiceKey)}>
              <Text>{menuTitle.WhereIsServiceScreenTitle}</Text>
            </Button>
            <Button rounded block info style={styles.Button}
              onPress={()=>this.props.navigation.navigate(navigateKeys.ChangePasswordKey)}>
              <Text>{menuTitle.ChangePasswordScreenTitle}</Text>
            </Button>
            {/* <Button rounded block info style={styles.Button}
              onPress={()=>this.props.navigation.navigate(navigateKeys.WriteCeturKey)}>
              <Text>{menuTitle.WriteCeturScreenTitle}</Text>
            </Button>
            <Button rounded block info style={styles.Button}
              onPress={()=>this.props.navigation.navigate(navigateKeys.SettingKey)}>
              <Text>{menuTitle.SettingScreenTitle}</Text>
            </Button> */}
        </Content>
    </Container>
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

const styles = StyleSheet.create({
  Button: {
    marginTop:20,
    marginLeft:20,
    marginRight:20,
    height:70
  },
});