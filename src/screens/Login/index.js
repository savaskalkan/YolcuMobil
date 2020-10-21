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
import { Images } from '../../../themes/';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Constant from '../../data/Constants';
import { LoginService } from '../../services'

var NavigateKeys = require('../../data/NavigateKeys.json');
var StorageKeys = require('../../data/StorageKeys.json');

export default class LoginScreen extends Component {
  loginService = new LoginService();

  constructor(props) {
    super(props);

    this.state = {
      gsmNumber: "",
      userPassword: "",
      isSpinnerShow: false
    };

    this.loginOperation = this.loginOperation.bind(this)
  }

  componentWillMount() {
    AsyncStorage.setItem(StorageKeys.SelectedVoyageId, "0");
    AsyncStorage.setItem(StorageKeys.SelectedVoyageIdWhereIsKey, "0");

    AsyncStorage.getItem(StorageKeys.IsLoginKey, (error, value) => {
      if (value == "true") {
        this.props.navigation.navigate(NavigateKeys.MenuKey);
      }
    });

    AsyncStorage.getItem(StorageKeys.IsWalkThroughShow, (error, value) => {
      if (value == null) {
        this.props.navigation.navigate(NavigateKeys.WalkthroughKey);
      }
    });
  }

  componentDidMount() {
    AsyncStorage.getItem("lastUserName").then(lastUserName => {
      lastUserName && this.setState({ gsmNumber: lastUserName })
    })
  }

  render() {
    AsyncStorage.setItem(StorageKeys.WhereIsServiceTimerEnableKey, "false");

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
            textStyle={{ color: '#FFF' }} />
        }
        <ImageBackground style={styles.backgroundImage} source={Images.walkthroughBackground}>
          <Header style={styles.header}>
            <Left style={styles.left} />
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
            {
              __DEV__ &&
              <TouchableOpacity
                info
                style={styles.signInbtn}
                onPress={()=>this.setState({
                  gsmNumber:"5079611458",
                  userPassword:"1400"
                })}
              >
                <Text autoCapitalize="words" style={styles.buttongetstarted}>
                  Test
            </Text>
              </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => this.props.navigation.navigate(NavigateKeys.OtpSmsKey)}>
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
  loginOperation() {
    //validation
    if (this.state.gsmNumber === "") {
      Alert.alert(Constant.ErrorText, "Gsm numaranızı giriniz")
      return;
    }
    if (this.state.userPassword === "") {
      Alert.alert(Constant.ErrorText, "Şifrenizi giriniz")
      return;
    }

    //control
    this.setState({ isSpinnerShow: true });

    this.loginService.login(this.state.gsmNumber, this.state.userPassword).then(responseJson => {
      console.log("responseJson login", responseJson)
      /**
       * Data:
          PassengerDetail={
            FirstName: "Reşit"
            LastName: "PAyçın"
            PassengerId: 301
            UserName: null
          }
          ExceptionMsg: null
          IsSuccess: true
       * 
       */
      setTimeout(() => {
        this.setState({
          isSpinnerShow: false
        });
      }, 1500);

      if (responseJson.IsSuccess) {
        AsyncStorage.setItem(StorageKeys.PassengerDetailKey, JSON.stringify(responseJson.Data.PassengerDetail));
        AsyncStorage.setItem(StorageKeys.IsLoginKey, "true");
        AsyncStorage.setItem(StorageKeys.lastUserName, this.state.gsmNumber); // zvs: son kullanıcıyı asyncde tutalım
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
