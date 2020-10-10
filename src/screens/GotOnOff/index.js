import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Button as RNButton, Image, ImageBackground, } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Card, CardItem, Body, Button } from 'native-base';

const data = {
  arac: "35 S 45987",
  lokasyon: "Mecidiyeköy, Şişli",
  koordinat: {
    lat: 25.2222,
    lng: 26.2222,
  },
  zaman: "08:00 10.10.20"
}
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [infoData, setInfoData] = useState({ ...data })
  const [isCancel, setIsCancel] = useState(true)

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setIsCancel(false)
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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

        {scanned && <RNButton buttonstyle={{ backgroundColor: 'red' }} title={'Vazgeç ve Tekrar Okut'} onPress={() => {
          setIsCancel(true)
          setScanned(false)
        }} />}
      </View>
    </ImageBackground>
  );
}

