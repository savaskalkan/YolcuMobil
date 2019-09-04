import React, { Component } from 'react';
import { Text,StatusBar, Platform, View} from 'react-native';
import { Container, Content} from 'native-base';
import styles from './styles';
import { SliderBox } from 'react-native-image-slider-box';
import { Metrics } from '../../../../../themes/';

export default class CarProfileScreen extends Component {
  constructor(props) {
 		super(props);
     this.state = {
      images: [
        'https://source.unsplash.com/1024x768/?nature',
        'https://source.unsplash.com/1024x768/?water',
        'https://source.unsplash.com/1024x768/?girl',
        'https://source.unsplash.com/1024x768/?tree'
      ]
    };
 	}

  render(){
		StatusBar.setBarStyle('light-content', true);
		if(Platform.OS === 'android') {
			StatusBar.setBackgroundColor('transparent',true);
			StatusBar.setTranslucent(true);
		}

    return(
      <Container style={styles.main}>
        <SliderBox images={this.state.images} sliderBoxHeight={Metrics.HEIGHT * 0.60}/>

        <Content>
        <View style={styles.detailsView}>
          <Text style={styles.nameTxt}>34 PT 1192</Text>      
        </View>
        </Content>

      </Container>
    );
  }
}
