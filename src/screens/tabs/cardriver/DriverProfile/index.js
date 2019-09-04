
import React, { Component } from 'react';
import { Text,StatusBar, Platform, ImageBackground,View} from 'react-native';
import { Container, Content} from 'native-base';
import styles from './styles';

export default class DriverProfileScreen extends Component {
  constructor(props) {
 		super(props);
    this.state = {};
 	}

  render(){
		StatusBar.setBarStyle('light-content', true);
		if(Platform.OS === 'android') {
			StatusBar.setBackgroundColor('transparent',true);
			StatusBar.setTranslucent(true);
		}
    const bgImage = "https://antiqueruby.aliansoftware.net//Images/profile/thumbnail_profile_ptwentyfour.png";

    return(
      <Container style={styles.main}>
        <ImageBackground source={{uri:bgImage}} style={styles.imgContainer}/>

        <Content>
        <View style={styles.detailsView}>
          <Text style={styles.nameTxt}>{this.props.driverInformation.Name} {this.props.driverInformation.Surname}</Text>
          <Text style={styles.addressTxt}>{this.props.driverInformation.PhoneNumber1}</Text>          
        </View>
        </Content>

      </Container>
    );
  }
}
