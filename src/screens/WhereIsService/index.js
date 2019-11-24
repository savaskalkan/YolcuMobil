import React, { Component } from 'react';
import {AsyncStorage,
  WebView,
  View,
  Text
} from 'react-native';
  import { Content} from "native-base";
import {GetDirectionsModel,GetWehicleLocationInformationModel} from '../../models';
import MapService from '../../services/MapService';
import ArventoService from '../../services/ArventoService';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'
import styles from "./styles";
import { Metrics } from "../../../themes/";

var StorageKeys=require('../../data/StorageKeys.json');

export default class WhereIsServiceScreen extends Component {
  mapService=new MapService();
  arventoService=new ArventoService();
  mapView=null;
  selectedVoyageId=0;
  passengerId=0;

  constructor(props){
    super(props); 
    
    this.state={
      stations:[],
      direction:{},
      webViewSource:"https://www.google.com/maps/",
      informationData: null,
      timer: null,
      counter:30
    }
  }  

  //compoenent life cycle
  render() {
    AsyncStorage.setItem(StorageKeys.WhereIsServiceTimerEnableKey,"true");  

    if(this.state.informationData!=null){
      return this.existInformationData();
    }
    else{
      return this.notExistInformationData();
    }
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
        this.getStationAndDirections();
    });
  }
  
  componentWillUnmount() {
    this.focusListener.remove();

    this.clearInterval(this.state.timer);
  }

  tick =() => {
    AsyncStorage.getItem(StorageKeys.WhereIsServiceTimerEnableKey, (error,value) => {    
      if(value=="true"){   
        let newCounter=this.state.counter-1;

        if(newCounter==-1){
          this.getLocationAsync();
          newCounter=30;
        }

        this.setState({
          counter: newCounter
        });
      }  
    }); 
  }

  //render methods
  existInformationData(){   
    return (
      <View style={styles.mainView}>        
        <View style={styles.MapReanderBg}>
          <WebView source={{uri: this.state.webViewSource}}  useWebKit={true}/>
        </View>
        <View style={styles.MainReanderBg}>
            <Content style={styles.content}>
                <View
                    style={
                      [styles.rowBg, { marginTop: Metrics.WIDTH * 0.05 }]
                    }
                    key={1}
                  >
                    <View style={styles.rowField}>
                      <Text style={styles.fieldLabelTxt}>Durağınız</Text>
                      <Text style={styles.fieldDescriptionTxt}>{this.state.informationData.BusStopName}</Text>
                    </View>
                    <View style={styles.rowListDivider} />

                    <View style={styles.rowField}>
                      <Text style={styles.fieldLabelTxt}>Aracın Konumu</Text>
                      <Text style={styles.fieldDescriptionTxt}>{this.state.informationData.WehicleCoordinate}</Text>
                    </View>
                    <View style={styles.rowListDivider} />

                    <View style={styles.rowField}>
                      <Text style={styles.fieldLabelTxt}>Kalan Süre Tahmini</Text>
                      <Text numberOfLines={1} style={styles.fieldDescriptionTxt}>
                        {this.state.informationData.EstimateTime} dk
                      </Text>
                    </View>
                    <View style={styles.rowListDivider} />

                    <View style={styles.rowField}>
                      <Text style={styles.fieldLabelTxt}>Yenilenme Süresi</Text>
                      <Text style={styles.fieldTimer}>{this.state.counter}</Text>
                    </View>
                    <View style={styles.rowListDivider} />
               </View>
            </Content>
         </View>
      </View>
    );
  }

  notExistInformationData(){
    return (
      <WebView source={{uri: this.state.webViewSource}}  useWebKit={true}/>
    );
  }

  //operation methods
  getStationAndDirections=()=>{
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {        
        stores.map((result, i, store) => {
          let key = store[i][0];
          let value = store[i][1];

          if(key==StorageKeys.PassengerDetailKey){
            var parsedUserDetail= JSON.parse(value);
            this.passengerId=parsedUserDetail["PassengerId"];
          }
          else if(key==StorageKeys.SelectedVoyageIdWhereIsKey)
             this.selectedVoyageId=value;
        });
        this.getDirections();

        this.getLocationAsync();        

        if(this.state.timer==null){
          let timer = setInterval(this.tick, 1000);
          this.setState({timer});
        }
      });
    });
  }

  //get items from api
  getDirections=()=>{
    var model=new GetDirectionsModel();
    model.VoyageId=this.selectedVoyageId;

    this.mapService.getDirections(model).then(responseJson => {
        if (!responseJson.IsSuccess) {             
            return;       
        }      
        this.openGoogleMapApplication(responseJson.Data.Direction);
    }).catch((error) => {
        console.log(error);
    });
  }

  getWehicleLocationInformation=(userLocation)=>{

    var model=new GetWehicleLocationInformationModel();
    model.VoyageId=this.selectedVoyageId;
    model.PassengerId=this.passengerId;
    model.UserLatitude=userLocation.latitude;
    model.UserLongitude=userLocation.longitude;

    this.arventoService.getWehicleLocationInformation(model).then(responseJson => {
        if (!responseJson.IsSuccess) {             
            return;       
        }    
        this.setState({
          informationData:{
            BusStopName:responseJson.Data.BusStopName,
            WehicleCoordinate:responseJson.Data.WehicleCoordinate,
            EstimateTime:responseJson.Data.EstimateTime,
            LoadingTime:30
          }
        })
    }).catch((error) => {
        console.log(error);
    });
  }

  //open google map application
  openGoogleMapApplication = (direction) => {
    let source =JSON.parse(direction.Source);
    let destination =JSON.parse(direction.Destination);
    let waypointList =JSON.parse(direction.Waypoints);  

    var webViewSource = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${destination.location.lat},${destination.location.lng}&origin=${source.location.lat},${source.location.lng}`

    if (waypointList.length !== 0) {
      const params = waypointList
        .map(value => `${value.latitude},${value.longitude}`)
        .join('|')
    
        webViewSource=webViewSource+`&waypoints=${params}`
    }
  
    this.setState({
      webViewSource:webViewSource
    });
  }

  //get current location
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Lokasyona erişim izni verilmedi',
        location,
      });
    }
    let location = await Location.getCurrentPositionAsync({});

    this.getWehicleLocationInformation(location.coords)
  }

}
