import React, { Component } from 'react';
import { Container,  Content, Icon,Tabs,Tab,TabHeading,Text} from 'native-base';
import DriverProfileScreen from '../tabs/cardriver/DriverProfile'
import CarProfileScreen from '../tabs/cardriver/CarProfile'
import {GetAracDetailsByAracId,GetDriverInformationRequestModel,GetAracDetailsByAracId} from '../../models';
import {PuantajService,DriverService} from '../../services';

export default class CarDriverScreen extends Component {
  
  puantajService=new PuantajService();
  driverService=new DriverService();

  constructor(props){
    super(props);

    this.state = {
      tokenRequestModel: new TokenRequestModel(),
      carImages:[],      
      driverInformation:{},      
      carDetail: {
        plaka: "",
      },
    }

    this.getCarImages=this.getCarImages.bind(this);
    this.getDriverInformation=this.getDriverInformation.bind(this);
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

}