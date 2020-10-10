import React, { Component } from "react";
import {
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  AsyncStorage
} from "react-native";
import { Metrics,  Images } from "../../../themes";
import styles from "./style";
import {Notifications } from 'expo';
import * as Permissions from 'expo-permissions'
import {LoginService} from '../../services'
import {UpdateNotificationTokenModel} from '../../models';

var StorageKeys=require('../../data/StorageKeys.json');
var navigateKeys=require('../../data/NavigateKeys.json');
var menuTitle=require('../../data/MenuTitles.json');

var flatlistDataSource = [
  {
    key: 1,
    title: menuTitle.CarDriverScreenTitle
  },
  {
    key: 2,
    title: menuTitle.BusStopRouteScreenTitle
  },
  {
    key: 3,
    title: menuTitle.WhereIsServiceScreenTitle
  },
  {
    key: 4,
    title: menuTitle.GotOnOffScreenTitle
  }
];

export default class MainScreen extends Component {
  loginService = new LoginService();

  constructor(props) {
    super(props);

    this.state={
      firstName:"",
      lastName:""
    }

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

  componentDidMount(){  
    AsyncStorage.getItem(StorageKeys.PassengerDetailKey)
    .then( value => {    
      var parsedUserDetail= JSON.parse(value);
       this.setState({
         firstName:parsedUserDetail["FirstName"],
         lastName:parsedUserDetail["LastName"]
       })
    }) 
  }

  render() {
    AsyncStorage.setItem(StorageKeys.WhereIsServiceTimerEnableKey,"false");

    if (Platform.OS == "android") {
      StatusBar.setTranslucent(true);
    }  
    
    return (
        <View style={styles.MainBG}>
          <Text style={styles.NewsCategoryText}>Hoşgeldiniz {this.state.firstName+" "+this.state.lastName}</Text>
          <Text style={styles.ChangeLaterText}>Seçiminizi yapabilirsiniz</Text>

          <View style={{ height: Metrics.HEIGHT * 0.7 }}>
             <FlatList
                data={flatlistDataSource}
                contentContainerStyle={styles.listContent}
                numColumns={2}
                keyExtractor={(item) => item.key.toString() }
                renderItem={({item, index, separators}) => (
                  <View>
                      <TouchableOpacity
                        style={styles.rowMain}
                        onPress={() => this.onFlatListPress(item.key)}
                      >
                        <ImageBackground style={styles.imagebg} >
                          <View
                            style={[styles.imagebg, { backgroundColor: "rgba(0,0,0,0.6)" }]}
                          >
                            <Text style={styles.catName}>{item.title}</Text>
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>
                    </View>
                )}
             />
          </View>
        </View>
        
    );
  }

  //methods  
  onFlatListPress = key => {
    let navigateKey=(key==1)?navigateKeys.CarDriverKey:
                    (key==2)?navigateKeys.BusStopRouteKey:
                    (key==3)?navigateKeys.WhereIsServiceKey:
                    (key==4)?navigateKeys.GotOnOffKey:"";

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
