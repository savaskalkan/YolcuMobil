import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Button as RNButton, Image, ImageBackground, Alert, } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Card, CardItem, Body, Button } from 'native-base';
import { QrService } from '../../services';
import * as Location from 'expo-location';

var StorageKeys = require('../../data/StorageKeys.json');

const data = {
  arac: "35 S 45987",
  lokasyon: "Mecidiyeköy, Şişli",
  koordinat: {
    lat: 25.2222,
    lng: 26.2222,
  },
  zaman: "08:00 10.10.20"
}

const sendData = {
  "QRString": "deneme-test",
  "PersonId": 1265,
  "Plaka": "34TL856",
  "KoltukNo": 3,
  "WehicleId": 1485,
  "AracId": 1245,
  "CoordinateX": "25.56963",
  "CoordinateY": "32.56326",
  "Address": "",
  "ProcessDate": new Date()
}
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [infoData, setInfoData] = useState({ ...data })
  const [isCancel, setIsCancel] = useState(true)

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  qrService = new QrService();

  const setQrService = (data) => {
    console.log("location", location)
    console.log("data", data)
    this.qrService.setQrInfo(data).then(responseJson => {
      console.log("responseJson", responseJson)
      if (responseJson.IsSuccess) {
        Alert.alert("Yolcu Mobil", "Bilgiler başarıyla kaydedildi..!")
        return;
      } else {
        Alert.alert("Yolcu Mobil", "Bilgiler kaydedilirken hata ile karşılaşıldı..!\n" + responseJson.ExceptionMsg)
      }

    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');

    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleBarCodeScanned = ({ type, qrdata }) => {
    setIsCancel(false)
    setScanned(true);
    // Decode the String
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
    const data = Base64.decode(qrdata); 
    alert(`Bar code with type ${type} and data ${qrdata} has been scanned!-> ${data}`);
    AsyncStorage.getItem(StorageKeys.PassengerDetailKey).then(userinfo => {
      userinfo = JSON.parse(userinfo)

      const datas = data.split("|")
      const vehicleid = datas[0]
      const aracid = datas[1]
      const plaka = datas[2]
      const koltukno = datas[3]
      const sendingDatas = {
        "QRString": data,
        "PersonId": userinfo.PassengerId,
        "Plaka": plaka,
        "KoltukNo": koltukno,
        "WehicleId": vehicleid,
        "AracId": aracid,
        "CoordinateX": location.coords.latitude,
        "CoordinateY": location.coords.longitude,
        "Address": "",
        "ProcessDate": new Date()
      }

      setQrService(sendingDatas)
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const _renderCard = (text, value) => {
    return (
      <Card>
        <CardItem>
          <Body>
            <Text style={{ fontWeight: 'bold', color: 'gray' }}>
              {text}
            </Text>
            <Text>
              {value}
            </Text>
          </Body>
        </CardItem>
      </Card>
    )
  }

  return (
    <ImageBackground imageStyle={{ opacity: 0.05 }} source={require('../../../assets/pattern.png')} style={{ width: '100%', height: '100%', }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}
        >
          <View style={{ backgroundColor: 'rgba(0,0,0,0.6)', padding: 7, borderRadius: 10, marginBottom: 10 }}>
            <Text style={{ color: '#fff' }}>Lütfen QR Kodu Okutunuz</Text>
          </View>
        </BarCodeScanner>
        <View style={{ flex: 3 }}>
          {
            !isCancel ?
              <ScrollView>
                <View>
                  {_renderCard("Araç", infoData.arac)}
                  {_renderCard("Lokasyon", infoData.lokasyon)}
                  {_renderCard("Koordinat", infoData.koordinat.lat + " - " + infoData.koordinat.lng)}
                  {_renderCard("Zaman", infoData.zaman)}
                </View>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                  <Button style={{ alignSelf: 'center', width: '60%', margin: 10, }} success><Text style={{ color: '#fff', textAlign: 'center', width: '100%' }}> Bindim </Text></Button>
                  {/* <Button onPress={() => setIsCancel(true)} style={{ alignSelf: 'center', width: '60%', margin: 10 }} danger><Text style={{ color: '#fff', textAlign: 'center', width: '100%' }}> Vazgeç </Text></Button> */}
                </View>
              </ScrollView>
              :
              <View>
                <Card>
                  <CardItem>
                    <Body>
                      <Text style={{ fontWeight: 'bold', color: 'gray', alignSelf: 'center' }}>
                        Henüz QR kod okutmadınız..!
                  </Text>
                    </Body>
                  </CardItem>
                </Card>
                <Image style={{ alignSelf: 'center', height: 150, width: 150, marginTop: 25 }} source={require('../../../assets/qrcodescanner.png')} />
              </View>
          }
        </View>
        <RNButton buttonstyle={{ backgroundColor: 'red' }} title={'tıkla'} onPress={() => setQrService(sendData)} />
        {scanned && <RNButton buttonstyle={{ backgroundColor: 'red' }} title={'Vazgeç ve Tekrar Okut'} onPress={() => {
          setIsCancel(true)
          setScanned(false)
        }} />}
      </View>
    </ImageBackground>
  );
}

