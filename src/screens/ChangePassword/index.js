import React, { Component } from "react";
import {
  TouchableHighlight,
  ImageBackground,
  Image,
  View,
  StatusBar,
  Platform,
  AsyncStorage,
  I18nManager,
  Alert
} from "react-native";
import {
  Text,
  Item,
  Input,
  Body,
  Header,
  Left,
  Right
} from "native-base";

import { Images, Colors } from "../../../themes/";
// Screen Styles
import styles from "./styles";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import * as Constant from '../../data/Constants';
import {LoginService} from '../../services'
import {UpdatePasswordMobileModel} from '../../models';

var StorageKeys=require('../../data/StorageKeys.json');
var NavigateKeys=require('../../data/NavigateKeys.json');
var passengerId=0;

export default class ChangePasswordScreen extends Component {
  loginService = new LoginService();

  constructor(props){
    super(props);

    this.state = {
      oldPassword:"",
      newPassword1:"",
      newPassword2:""
    };

    this.updatePassword=this.updatePassword.bind(this);
  }

  componentDidMount (){
    AsyncStorage.setItem(StorageKeys.WhereIsServiceTimerEnableKey,"false");  

    AsyncStorage.getItem(StorageKeys.PassengerDetailKey)
    .then( value => {    
      var parsedUserDetail= JSON.parse(value);
      passengerId=parsedUserDetail["PassengerId"];
    })
  }
  
  render() {
    StatusBar.setBarStyle("light-content", true);

    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("transparent", true);
      StatusBar.setTranslucent(true);
    }
    
    return (
      <ImageBackground source={Images.walkthroughBackground} style={styles.screenBg}>
        <View style={styles.container}>
          <View style={styles.view2}>
               <Item underline style={styles.itememail}>
                  <SimpleLineIcons name="key" color="#c9b0c1" size={17} />
                  <Input                
                        placeholderTextColor={Colors.white}
                        textAlign={I18nManager.isRTL ? "right" : "left"}
                        style={styles.inputemail}
                        secureTextEntry={true} 
                        value={this.state.oldPassword} 
                        onChangeText={(value) => this.setState({ oldPassword: value })}
                        placeholder='Eski Şifre' />
                </Item>
               <Item underline style={styles.itememail}>
                  <SimpleLineIcons name="lock" color="#c9b0c1" size={17} />
                  <Input                
                        placeholderTextColor={Colors.white}
                        textAlign={I18nManager.isRTL ? "right" : "left"}
                        style={styles.inputemail}
                        secureTextEntry={true} 
                        value={this.state.newPassword1} 
                        onChangeText={(value) => this.setState({ newPassword1: value })}
                        placeholder='Yeni Şifre 1' />
                </Item>
               <Item underline style={styles.itememail}>
                  <SimpleLineIcons name="lock" color="#c9b0c1" size={17} />
                  <Input                
                        placeholderTextColor={Colors.white}
                        textAlign={I18nManager.isRTL ? "right" : "left"}
                        style={styles.inputemail}
                        secureTextEntry={true} 
                        value={this.state.newPassword2} 
                        onChangeText={(value) => this.setState({ newPassword2: value })}
                        placeholder='Yeni Şifre 2' />
                </Item>
          </View>

          <TouchableHighlight
            info
            style={styles.buttondialogsignup}
            onPress={this.updatePassword}
          >
            <Text autoCapitalize="words" style={styles.buttonsignin}>
              Onayla
            </Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }

  //methods
  updatePassword(){       
    //validation
    if(this.state.oldPassword===""){
      Alert.alert(Constant.ErrorText,"Eski şifrenizi giriniz")
      return;
    }
    if(this.state.newPassword1===""){
        Alert.alert(Constant.ErrorText,"Yeni 1 şifrenizi giriniz")
        return;
    }
    if(this.state.newPassword2===""){
        Alert.alert(Constant.ErrorText,"Yeni 2 şifrenizi giriniz")
        return;
    }

    //control
    var model=new UpdatePasswordMobileModel();
    model.PassengerId=passengerId;
    model.OldPassword=this.state.oldPassword;
    model.NewPassword1=this.state.newPassword1;
    model.NewPassword2=this.state.newPassword2;

    this.loginService.updatePasswordMobile(model).then(responseJson => {
        if (!responseJson.IsSuccess) {             
            Alert.alert(Constant.ErrorText, responseJson.ExceptionMsg);        
        }
        else{
            Alert.alert(Constant.SuccessText, "Şifreniz değiştirildi"); 

            AsyncStorage.setItem(StorageKeys.IsLoginKey,"false");

            this.props.navigation.navigate(NavigateKeys.LoginKey);
        } 
    }).catch((error) => {
        console.log(error);
    });
  }
}
