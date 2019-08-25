import React, { Component } from "react";
import {
  TouchableHighlight,
  ImageBackground,
  Image,
  View,
  StatusBar,
  Platform,
  TouchableOpacity,
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

import { Images, Colors } from "../../../../themes/";
// Screen Styles
import styles from "./styles";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import * as Constant from '../../../data/Constants';
import {LoginService} from '../../../services'
import Spinner from 'react-native-loading-spinner-overlay';
import {CreatePasswordMobileModel} from '../../../models';

export default class OtpSmsScreen extends Component {
  loginService = new LoginService();

  constructor(props){
    super(props);

    this.state = {
      passengerId:0,
      gsmNumber: "",
      smsText:"",
      newPassword1:"",
      newPassword2:"",
      animateLogin: false,
      messageSend:false
    };

    this.sendOtpSms=this.sendOtpSms.bind(this);
    this.createPassword=this.createPassword.bind(this);
  }

  render() {
    StatusBar.setBarStyle("light-content", true);

    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("transparent", true);
      StatusBar.setTranslucent(true);
    }

    return (
      <ImageBackground source={Images.walkthrough1} style={styles.screenBg}>
        {this.state.animateLogin &&         
          <Spinner
                  visible={this.state.animateLogin}
                  textContent={Constant.LoadingText}
                  textStyle={{color: '#FFF' }}
                  />
        }
        <View style={styles.container}>
          <Header style={styles.header}>
            <Left style={styles.left}>
            </Left>
            <Body style={styles.body} />
            <Right style={styles.right} />
          </Header>

          <Image source={Images.bms} style={styles.logostyle} />

          <View style={styles.view2}>
              {!this.state.messageSend && (           
                <Item underline style={styles.itememail}>
                  <SimpleLineIcons name="phone" color="#c9b0c1" size={17} />
                  <Input 
                        placeholderTextColor={Colors.white}
                        textAlign={I18nManager.isRTL ? "right" : "left"}
                        style={styles.inputemail}
                        placeholder='Gsm Numarası'
                        value={this.state.gsmNumber} 
                        keyboardType="numbers-and-punctuation"
                        onChangeText={(value) => this.setState({ gsmNumber: value })} />
                </Item>
              )}
              {this.state.messageSend && (           
                <Item underline style={styles.itememail}>
                  <SimpleLineIcons name="key" color="#c9b0c1" size={17} />
                  <Input                
                        placeholderTextColor={Colors.white}
                        textAlign={I18nManager.isRTL ? "right" : "left"}
                        style={styles.inputemail}
                        value={this.state.smsText} 
                        keyboardType="numbers-and-punctuation"
                        onChangeText={(value) => this.setState({ smsText: value })}
                        placeholder='Sms Şifre' />
                </Item>
              )}
              {this.state.messageSend && (           
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
              )}
              {this.state.messageSend && (           
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
              )}
          </View>

          <TouchableHighlight
            info
            style={styles.buttondialogsignup}
            onPress={this.operation.bind(this)}
          >
            <Text autoCapitalize="words" style={styles.buttonsignin}>
              {!this.state.messageSend?"Gönder":"Onayla"}
            </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.view3}>
          <TouchableOpacity
            style={styles.signInTxtBg}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={styles.buttontext}>İptal</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  //methods
  operation(){
    if(!this.state.messageSend){
        this.sendOtpSms();
    }
    else{
        this.createPassword();
    }
  }

  sendOtpSms(){
    //validation
    if(this.state.gsmNumber===""){
        Alert.alert(Constant.ErrorText,"Gsm numaranızı giriniz")
        return;
    }

    //control
    this.setState({ animateLogin: true });
    const message="Yolcu mobil uygulamasına giriş için oluşturulan şifre"

    this.loginService.sendOtpSms(this.state.gsmNumber, message).then(responseJson => {      
        if (!responseJson.IsSuccess) {             
            Alert.alert(Constant.ErrorText, responseJson.ExceptionMsg);        
        }
        setTimeout(()=>
            this.setState({ 
                animateLogin:false,
                messageSend:responseJson.IsSuccess,
                passengerId:responseJson.Data!=null? responseJson.Data.PassengerId:0,
            })
         , 1500); 
    }).catch((error) => {
        console.log(error);
    });
  }

  createPassword(){
    //control
    var model=new CreatePasswordMobileModel();
    model.PassengerId=this.state.passengerId;
    model.SmsText=this.state.smsText;
    model.NewPassword1=this.state.newPassword1;
    model.NewPassword2=this.state.newPassword2;

    this.loginService.createPasswordMobile(model).then(responseJson => {
        if (!responseJson.IsSuccess) {             
            Alert.alert(Constant.ErrorText, responseJson.ExceptionMsg);        
        }
        else{
            Alert.alert(Constant.SuccessText, "Şifreniz oluşturuldu"); 
            this.props.navigation.goBack();
        } 
    }).catch((error) => {
        console.log(error);
    });
  }
}
