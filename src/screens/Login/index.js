import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  Platform,
  ImageBackground,
  TouchableOpacity,
  I18nManager,
  AsyncStorage,
  Alert
} from "react-native";
import {
  Container,
  Right,
  Item,
  Input,
  Header,
  Left,
  Body,
  Form
} from "native-base";
import styles from "./styles";
import {Images} from '../../../themes/';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Constant from '../../data/Constants';
import {LoginService} from '../../services'

var NavigateKeys=require('../../data/NavigateKeys.json');
var StorageKeys=require('../../data/StorageKeys.json');

export default class LoginScreen extends Component {
  loginService = new LoginService();

  constructor(props){
    super(props);

    this.state = {
      gsmNumber: "",
      userPassword: "",
      isSpinnerShow: false
    };

    this.loginOperation=this.loginOperation.bind(this)
  }

  componentWillMount() {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          let key = store[i][0];
          let value = store[i][1];

          if(key==StorageKeys.IsLoginKey && value=="true"){
            this.props.navigation.navigate(NavigateKeys.MenuKey);
          }            
          else if(key==StorageKeys.IsWalkThroughShow && value==null){
            this.props.navigation.navigate(NavigateKeys.WalkthroughKey)
          }
        });
        
      });
    });
  }

  render() {
    StatusBar.setBarStyle("light-content", true);

    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("transparent", true);
      StatusBar.setTranslucent(true);
    }

    return (
      <Container >
         {this.state.isSpinnerShow &&
          <Spinner visible={this.state.isSpinnerShow} 
            textContent={Constant.LoadingText}  
            textStyle={{color: '#FFF' }} />
        }
        <ImageBackground style={styles.backgroundImage} source={Images.walkthroughBackground}>
        <Header style={styles.header}>
            <Left style={styles.left}/>
            <Body style={styles.body} />
            <Right style={styles.right} />
          </Header>
          <View style={styles.logosec}>
            <Image source={Images.bms} style={styles.logostyle} />
          </View>
          <Form style={styles.form}>
            <Item rounded style={styles.inputStyle}>
              <Input
                placeholderTextColor="#ffffff"
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="Gsm Numarası"
                style={styles.inputmain}
                value={this.state.gsmNumber} 
                keyboardType="numeric"
                onChangeText={(value) => this.setState({ gsmNumber: value })}
              />
            </Item>
            <Item rounded style={[styles.inputStyle, { marginTop: 10 }]}>
              <Input
                placeholderTextColor="#ffffff"
                placeholder="Şifre"
                secureTextEntry={true}
                textAlign={I18nManager.isRTL ? "right" : "left"}
                style={styles.inputmain}
                onChangeText={(value) => this.setState({ userPassword: value })}
                value={this.state.userPassword} 
              />
            </Item>
            <TouchableOpacity
              info
              style={styles.signInbtn}
              onPress={this.loginOperation}
            >
              <Text autoCapitalize="words" style={styles.buttongetstarted}>
                Giriş Yap
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert("Forgot Password")}>
              <Text autoCapitalize="words" style={styles.buttongettext}>
                Şifremi Unuttum
              </Text>
            </TouchableOpacity>
          </Form>
        </ImageBackground>
      </Container>
    );
  }

  //methods
  loginOperation(){
    //validation
    if(this.state.gsmNumber===""){
        Alert.alert(Constant.ErrorText,"Gsm numaranızı giriniz")
        return;
    }
    if(this.state.userPassword===""){
        Alert.alert(Constant.ErrorText,"Şifrenizi giriniz")
        return;
    }

    //control
    this.setState({ isSpinnerShow: true });
 
    this.loginService.login(this.state.gsmNumber, this.state.userPassword).then(responseJson => {        
        setTimeout(()=>{
            this.setState({ 
                isSpinnerShow:false
            });     
        }, 1500);        
            
        if (responseJson.IsSuccess ) {
            AsyncStorage.setItem(StorageKeys.PassengerDetailKey,JSON.stringify(responseJson.Data.PassengerDetail));
            AsyncStorage.setItem(StorageKeys.IsLoginKey,"true");            
            this.props.navigation.navigate(NavigateKeys.MenuKey);
        }
        else {
            Alert.alert(Constant.ErrorText, responseJson.ExceptionMsg);
        }      
    }).catch((error) => {
        console.log(error);
    });
   }
}
