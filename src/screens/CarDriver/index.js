import React, { Component } from 'react';
import { Container,  Content, Icon,Tabs,Tab,TabHeading,Text} from 'native-base';
import DriverProfileScreen from '../tabs/cardriver/DriverProfile'
import CarProfileScreen from '../tabs/cardriver/CarProfile'

export default class CarDriverScreen extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      selectedTab:0,
    }
  }
  render() {
    return (
      <Container>
      <Content> 
        <Tabs initialPage={0} page={this.state.selectedTab} style={{paddingTop:5}} locked={true}>
          <Tab heading={<TabHeading><Icon name="bus" /><Text>Aracım</Text></TabHeading>}>
            <CarProfileScreen/>
          </Tab>
          <Tab heading={<TabHeading><Icon name="ios-card" /><Text>Sürücüm</Text></TabHeading>}>
            <DriverProfileScreen/>
          </Tab>
        </Tabs>  
      </Content>
     </Container>  
    );
  }
}