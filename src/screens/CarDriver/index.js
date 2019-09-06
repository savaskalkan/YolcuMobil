import React, { Component } from 'react';
import { Container,  Content, Icon,Tabs,Tab,TabHeading,Text} from 'native-base';
import DriverProfileScreen from '../tabs/cardriver/DriverProfile'
import CarProfileScreen from '../tabs/cardriver/CarProfile'
import {GetAracDetailsByAracId,GetDriverInformationRequestModel,GetCarIdFromPassengerRequestModel} from '../../models';
import {PuantajService,DriverService,MapService} from '../../services';
import {  AsyncStorage} from "react-native";

var StorageKeys=require('../../data/StorageKeys.json');
var passengerId=0;

export default class CarDriverScreen extends Component {
  
  puantajService=new PuantajService();
  driverService=new DriverService();
  mapService=new MapService();

  constructor(props){
    super(props);

    this.state = {
      carImages:[],      
      driverInformation:{},      
      carDetail: {
        plaka: "",
      },
    }

    this.getCarImages=this.getCarImages.bind(this);
    this.getCarDetails=this.getCarDetails.bind(this);
    this.getDriverInformation=this.getDriverInformation.bind(this);
    this.getCarIdFromPassenger=this.getCarIdFromPassenger.bind(this);
    
  }
  render() {
    return (
      <Container>
      <Content> 
        <Tabs initialPage={0} style={{paddingTop:5}} locked={true}>
          <Tab heading={<TabHeading><Icon name="bus" /><Text>Aracım</Text></TabHeading>}>
            <CarProfileScreen carDetail={this.state.carDetail} carImages={this.state.carImages}/>
          </Tab>
          <Tab heading={<TabHeading><Icon name="ios-card" /><Text>Sürücüm</Text></TabHeading>}>
            <DriverProfileScreen driverInformation={this.state.driverInformation}/>
          </Tab>
        </Tabs>  
      </Content>
     </Container>  
    );
  }

  componentDidMount (){
    AsyncStorage.getItem(StorageKeys.PassengerDetailKey)
    .then( value => {    
      var parsedUserDetail= JSON.parse(value);
      let passengerId=parsedUserDetail["PassengerId"];

      this.getCarIdFromPassenger(passengerId)
    })
  }

    //api methods
    getCarDetails(carId) {
      var request = new GetAracDetailsByAracId();
      request.Token = "";
      request.AracId = carId;
  
      this.puantajService.getAracDetailsByAracId(request).then(responseJson => {
          this.setState({
              carDetail: responseJson.Data.wehicleList[0]
          });
  
      }).catch((error) => {
          console.error(error);
      });
    }

    getCarImages(carId) {
      var request = new GetAracDetailsByAracId();
      request.AracId = carId;
      request.SType = "9";
      request.DType = "9";
  
      this.puantajService.getAracResimlerByAracId(request).then(responseJson => {

          if (responseJson.Data && responseJson.Data.imageList.length > 0) {              
            this.setState({
              carImages: responseJson.Data.imageList
            });
          }           
      }).catch((error) => {
          console.error(error);
      });
    }

    getDriverInformation(personId){
      var model=new GetDriverInformationRequestModel();
      model.PersonId=personId;
      
      this.driverService.getDriverInformation(model).then(responseJson => {
          if (!responseJson.IsSuccess) {          
              return;       
          }
          this.setState({
            driverInformation:responseJson.Data.DriverInformation
          });
  
      }).catch((error) => {
          console.log(error);
      });
    }  

    getCarIdFromPassenger(passengerId){
      var model=new GetCarIdFromPassengerRequestModel();
      model.PassengerId=passengerId;
      
      this.mapService.getCarIdFromPassenger(model).then(responseJson => {

          if (!responseJson.IsSuccess) {          
              return;       
          }

          this.getCarDetails(responseJson.Data.CarId)
          this.getCarImages(responseJson.Data.CarId)
          this.getDriverInformation(responseJson.Data.PersonId);  
      }).catch((error) => {
          console.log(error);
      });
    }
    
}