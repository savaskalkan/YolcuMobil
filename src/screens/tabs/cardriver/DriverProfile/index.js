
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
    

    const bgImage =  this.props.driverInformation.Avatar!=undefined && this.props.driverInformation.Avatar!=""?
                    this.props.driverInformation.Avatar:
                    "https://3znvnpy5ek52a26m01me9p1t-wpengine.netdna-ssl.com/wp-content/uploads/2017/07/noimage_person.png";

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
