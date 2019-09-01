
import React, { Component } from 'react';
import { AsyncStorage, View, Image, StatusBar, Platform, ImageBackground,Dimensions,TouchableOpacity, ListView,BackHandler, I18nManager} from 'react-native';
import { Container,Header,Left,Right,Body } from 'native-base';
import RNSwiper from './RNSwiper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {Images, Metrics} from '../../../themes/';

var NavigateKeys=require('../../data/NavigateKeys.json');
var StorageKeys=require('../../data/StorageKeys.json');

export default class WalkthroughTravel extends Component {

  constructor(props) {
 		super(props);

 		this.state = {
      index: '',
    };

    const dataObjects = [
      {flag:true},
      {flag:false},
      {flag:false},
    ]
    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    this.state = {
       activeindicator: 0,
    };

    this.onPress=this.onPress.bind(this);
    this.goLogin=this.goLogin.bind(this);
 	}

  componentWillMount() {
	  var that = this
	  BackHandler.addEventListener('hardwareBackPress', function() {
			that.props.navigation.navigate('Walkthrough')
	   	return true;
	  });
	}

   _renderRow (rowData) {
     var temp = ''
     if(rowData.flag==true){
       temp = styles.activeDot
     } else {
       temp = styles.dot
     }
     return (
       <View>
         <View style={temp}/>
       </View>
     )
   }

    onSwipeUp(index){
    }

    onSwipeDown(index){
    }

    onSwipeLeft(index){
     this.setState({activeindicator: (this.state.activeindicator + 1)})
    }
    onSwipeRight(index){
       this.setState({activeindicator: (this.state.activeindicator - 1)})
     }

    onPress(index){
      if(index==3){
        this.goLogin()
      }
    }

  goLogin(){
    AsyncStorage.setItem(StorageKeys.IsWalkThroughShow,"true");

    this.props.navigation.navigate(NavigateKeys.LoginKey)
  }

  render(){
		StatusBar.setBarStyle('light-content', true);
		if(Platform.OS === 'android') {
			StatusBar.setBackgroundColor('transparent',true);
			StatusBar.setTranslucent(true);
		}

    var data = [
      {
        id: 1,
        image: Images.walkthrough1,
        title: 'Hoşgeldiniz',
        description: 'Çetur Yolcuma hoşgeldiniz',
        flag: true
      },
      {
        id: 2,
        image: Images.walkthrough2,
        title: 'Huzur',
        description: 'Müşteri memnuniyeti odaklı çalışma anlayışıyla hizmet verdiği alanlarda ilklerin de uygulayıcısı olmuştur.',
      },
      {
        id: 3,
        image: Images.splash,
        title: 'Yüksek Kalite',
        description: 'Hizmetlerindeki yüksek kalite anlayışı ve devamlılık prensibiyle tutarlılık örneği olmaya ve saygın firmalar tarafından bu özellikleriyle tercih edilmeye devam etmektedir.',
      },
      {
        id: 4,
        image: Images.walkthrough3,
        title: 'Nitelikli Personel',
        description: 'Sahip olduğu nitelikli personel yapılanmasıyla özel sektör, kamu ve uluslararası seçkin şirketlere sunduğu hizmetlerle hızla büyümesini sürdürmektedir.',
      },
    ]

    var indicatordata = []

    for(var i=0; i<data.length;i++){
      indicatordata.push(
        <View key={i}>
        {
          (i == this.state.activeindicator) ?
          <View style={styles.activeDot}></View>
          :
          <View style={styles.dot}></View>
        }
        </View>
      )
    }
    return(
       <Container style={styles.container}>
        <ImageBackground source={Images.walkthroughBackground} style={styles.imgContainer}>
         <Header style={styles.header}>
           <Left style={styles.left}>
           </Left>
           <Body style={styles.body}>
           </Body>
           <Right style={styles.right}/>
             <TouchableOpacity style={styles.backArrow} onPress={()=>this.goLogin()}>
               <FontAwesome name="angle-right" size={30} color="white"/>
             </TouchableOpacity>
          </Header>

          <View style={{backgroundColor:'transparent'}}>
           <View style={styles.slidesec}>
             <RNSwiper
               minimumScale={0.9}
               minimumOpacity={0.5}
               overlap={100}
               cardWidth={Metrics.WIDTH * 0.85}
               duration={100}
               swipeThreshold={100}
               onSwipeUp={this.onSwipeUp}
               onSwipeDown={this.onSwipeDown}
               onSwipeRight={()=>this.onSwipeRight()}
               onSwipeLeft={()=>this.onSwipeLeft()}
               onPress={this.onPress}
               swiperDetails={data}>
               {
                 data.map((item, index) => {
                   return (
                     <View style={styles.slide} key={index}>
                       <Image source={item.image} style={styles.sliderImage}/>
                     </View>
                   )
                 })
               }
             </RNSwiper>
             <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
               {
                 data.map((item, index) => {
                   return(
                     <View key={index}>
                     {
                       (index == this.state.activeindicator) ?
                       <View style={styles.activeDot}></View>
                       :
                       <View style={styles.dot}></View>
                     }
                     </View>
                   )
                 })
               }
             </View>
           </View>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}
