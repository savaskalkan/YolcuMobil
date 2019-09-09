import React, { Component } from 'react';
import {Alert} from 'react-native'
import {
  View,
  TouchableOpacity,
  Text,} from 'react-native';
  import { Container,  Content,  Grid, Row, Col } from 'native-base';
import { Metrics } from "../../../../themes/";
import styles from "./styles";
import {GetPassengersAtBusStopModel} from '../../../models';
import MapService from '../../../services/MapService';
import * as Constant from '../../../data/Constants';

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
        <View style={styles.PassengerReanderBg}>   
          <Text style={styles.NewsCategoryText}> {this.selectedBusStopName}</Text>
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
                      <Text style={styles.PassengerName}>
                        {item.PassengerName} {item.PassengerSurname}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: Metrics.HEIGHT * 0.01
                      }}
                    >
                    <Text style={styles.PassengerGsmNumber}>
                      {item.PassengerGsmNumber}
                    </Text>
                    </View>
                  <View style={styles.HorizontalDivider} />
                </View>
              );
            })}
          </Content>
        </View>
        <Grid>
              <Row style={{ alignContent: "center", alignItems: "center" }}>
                  <Col size={50} >          
                    <TouchableOpacity
                        style={styles.exitButton}
                        onPress={() => this.props.navigation.goBack()}
                        underlayColor='#fff'>
                              <Text style={styles.buttonText}>Kapat</Text>
                    </TouchableOpacity>
                  </Col>
              </Row>
          </Grid>
    </View>
    );
  }

  
  // api methods
  getPassengersAtBusStop=(busStopId)=>{
    var model=new GetPassengersAtBusStopModel();
    model.BusStopId=busStopId;

    this.mapService.getPassengersAtBusStop(model).then(responseJson => {
        if (!responseJson.IsSuccess) { 
            Alert.alert(Constant.WarningText, "Yolcu bulunamadı");   
            this.props.navigation.goBack()            
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
