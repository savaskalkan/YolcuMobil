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
  "ProcessDate": "2020-10-18T21:53"
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
    console.log("location",location)
    this.qrService.setQrInfo(data).then(responseJson => {
      console.log("responseJson", responseJson)
      if (!responseJson.IsSuccess) {
        Alert.alert("Yolcu Mobil","Bilgiler başarıyla kaydedildi..!")
        return;
      }else{
        Alert.alert("Yolcu Mobil","Bilgiler kaydedilirken hata ile karşılaşıldı..!\n" + responseJson.ExceptionMsg )
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
  
  const handleBarCodeScanned = ({ type, data }) => {
    setIsCancel(false)
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    AsyncStorage.getItem(StorageKeys.PassengerDetailKey).then(userinfo => {
      userinfo = JSON.parse(userinfo)

      const datas = data.split("|")
      const wehicleid = datas[0]
      const aracid = datas[1]
      const plaka = datas[2]
      const koltukno = datas[3]
      const sendingDatas = {
        "QRString": data,
        "PersonId": userinfo.PassengerId,
        "Plaka": plaka,
        "KoltukNo": koltukno,
        "WehicleId": wehicleid,
        "AracId": aracid,
        "CoordinateX": location.coords.latitude,
        "CoordinateY": location.coords.longitude,
        "Address": "",
        "ProcessDate": "2020-10-18T21:53"
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

