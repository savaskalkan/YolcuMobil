import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,} from 'react-native';
  import { Container,  Content,  Grid, Row, Col } from 'native-base';
import { Metrics } from "../../../../themes/";
import styles from "./styles";
import {GetPassengersAtBusStopModel} from '../../../models';
import MapService from '../../../services/MapService';

export default class PassengersModalScreen extends Component {
  mapService=new MapService();
  selectedBusStopName="";

  constructor(props){
    super(props); 
    
    this.state={
      passengersData:[]
    }

    this.getPassengersAtBusStop=this.getPassengersAtBusStop.bind(this);
  }

  componentDidMount(){
    const busStopId = this.props.navigation.getParam("SelectedBusStopId", 0);
    this.getPassengersAtBusStop(busStopId);

    this.selectedBusStopName = this.props.navigation.getParam("SelectedBusStopName", 0);
  }

  render() {
    return (
      <View style={styles.mainView}>      
        <View style={styles.MainReanderBg}>   
          <Text style={styles.NewsCategoryText}> {this.selectedBusStopName} Yolcuları</Text>
          <Content>
            {this.state.passengersData.map((item, index) => {
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
                        {item.PassengerName} {item.PassengerSurname}
                      </Text>
                    </View>
                    <Text style={styles.CurrentBusStop}>
                      {item.PassengerGsmNumber}
                    </Text>
                  <View style={styles.HorizontalDivider} />
                </View>
              );
            })}
             <TouchableOpacity
                              style={styles.exitButton}
                              onPress={this.props.navigation.goBack()}
                              underlayColor='#fff'>
                              <Text style={styles.buttonText}>Kapat</Text>
                    </TouchableOpacity>
          </Content>
        </View>
    </View>
    );
  }

  
  // api methods
  getPassengersAtBusStop=(busStopId)=>{
    var model=new GetPassengersAtBusStopModel();
    model.BusStopId=busStopId;

    this.mapService.getPassengersAtBusStop(model).then(responseJson => {
        if (!responseJson.IsSuccess) {             
            return;       
        }    
        
        const passegers=[];
        responseJson.Data.Passengers.map((passenger, index) => (
          passegers.push({
            id: index,
            PassengerName: passenger.Name,
            PassengerSurname: passenger.Surname,
            PassengerGsmNumber: passenger.GsmNumber
          })
        ));

        this.setState({
          passengersData:passegers
        });
    }).catch((error) => {
        console.log(error);
    });
  }

}
