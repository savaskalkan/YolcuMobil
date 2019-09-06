import React, { Component } from 'react';
import { Text,StatusBar, Platform, View} from 'react-native';
import { Container, Content} from 'native-base';
import styles from './styles';
import { SliderBox } from 'react-native-image-slider-box';
import { Metrics } from '../../../../../themes/';

export default class CarProfileScreen extends Component {

  render(){
    const carImages=[];
    this.props.carImages.map((image, index) => (
        carImages.push(image.fullPath)
    ));

		StatusBar.setBarStyle('light-content', true);
		if(Platform.OS === 'android') {
			StatusBar.setBackgroundColor('transparent',true);
			StatusBar.setTranslucent(true);
		}

    return(
      <Container style={styles.main}>
        <SliderBox images={carImages} sliderBoxHeight={Metrics.HEIGHT * 0.60}/>

        <Content>
        <View style={styles.detailsView}>
          <Text style={styles.nameTxt}>{this.props.carDetail!=null?this.props.carDetail.plaka:""}</Text>      
        </View>
        </Content>

      </Container>
    );
  }
}
