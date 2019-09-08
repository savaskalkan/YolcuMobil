import React, { Component } from 'react';
import {AsyncStorage,
  WebView,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  Text,} from 'react-native';
import {GetDirectionsModel,GetBusStopsModel} from '../../models';
import MapService from '../../services/MapService';
import { Content,Grid,Row,Col } from "native-base";
import { Metrics } from "../../../themes/";
import styles from "./styles";

var StorageKeys=require('../../data/StorageKeys.json');

export default class BusStopRouteScreen extends Component {
  mapService=new MapService();
  mapView=null;
  selectedVoyageId=0;

  constructor(props){
    super(props); 
    
    this.state={
      stations:[],
      direction:{},
      webViewSource:"https://www.google.com/maps/",
      busStopData:[]
    }
  }  

  //compoenent life cycle
  render() {
    return (
      <View style={styles.mainView}>        
        <View style={styles.MapReanderBg}>
           <WebView source={{uri: this.state.webViewSource}} />
        </View>
        <View style={styles.MainReanderBg}>
          <Content>
            {this.state.busStopData.map((item, index) => {
              return (
                <View key={index} style={{ backgroundColor: "#fff" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: Metrics.HEIGHT * 0.01
                      }}
                    >
                      <Text style={styles.BusStopNumber}>
                        {item.BusStopNumber}
                      </Text>
                    
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate('PassengersModal',{
                            SelectedBusStopId: item.id,
                            SelectedBusStopName:item.BusStopName
                          })
                        }}
                      >
                        <Text style={styles.VoyagesLinkText}>
                            {"YOLCULAR"}
                        </Text>
                    </TouchableOpacity>
                    </View>
                    <Text style={styles.BusStopName}>
                      {item.BusStopName}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        ...Platform.select({
                          ios: {
                            marginTop: Metrics.HEIGHT * 0.01
                          },
                          android: {}
                        })
                      }}
                    >
                      <Text style={styles.CurrentBusStop}>
                        {item.CurrentBusStop}{" "}
                      </Text>
                    </View>
                  <View style={styles.HorizontalDivider} />
                </View>
              );
            })}
          </Content>
        </View>
    </View>
    );
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
        this.getStationAndDirections();
    });
  }
  
  componentWillUnmount() {
    this.focusListener.remove();
  }

  //operation methods
  getStationAndDirections=()=>{
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        let passengerId="0";

        stores.map((result, i, store) => {
          let key = store[i][0];
          let value = store[i][1];

          if(key==StorageKeys.PassengerDetailKey){
            var parsedUserDetail= JSON.parse(value);
            passengerId=parsedUserDetail["PassengerId"];
          }
          else if(key==StorageKeys.SelectedVoyageId)
             selectedVoyageId=value;
        });

        this.getDirections(selectedVoyageId);
        this.getBusStops(selectedVoyageId,passengerId);
      });
    });
  }

  //get items from api
  getDirections=()=>{
    var model=new GetDirectionsModel();
    model.VoyageId=selectedVoyageId;

    this.mapService.getDirections(model).then(responseJson => {
        if (!responseJson.IsSuccess) {             
            return;       
        }      
        this.openGoogleMapApplication(responseJson.Data.Direction);
    }).catch((error) => {
        console.log(error);
    });
  }

  getBusStops=(passengerId)=>{
    var model=new GetBusStopsModel();
    model.VoyageId=selectedVoyageId;
    model.PassengerId=passengerId;

    this.mapService.getBusStops(model).then(responseJson => {
        if (!responseJson.IsSuccess) {             
            return;       
        }    
        
        const busStops=[];
        responseJson.Data.BusStops.map((busStop, index) => (
          busStops.push({
            id: busStop.Id,
            BusStopNumber: "DURAK: "+busStop.Number,
            BusStopName: busStop.Name,
            CurrentBusStop: busStop.CurrentBusStop==1?"DURAĞINIZ":""
          })
        ));

        this.setState({
          busStopData:busStops
        });
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


}
