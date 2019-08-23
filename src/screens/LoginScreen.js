import React,{Component} from "react";
import { View,AsyncStorage } from 'react-native';
import {Button,Text} from 'native-base'

var NavigateKeys=require('../data/NavigateKeys.json');
var StorageKeys=require('../data/StorageKeys.json');

export default class LoginScreen extends Component{
    componentWillMount(){
        AsyncStorage.getItem(StorageKeys.IsWalkThroughShow)
                    .then(value => {
                        if(value==null){
                            this.props.navigation.navigate(NavigateKeys.WalkthroughKey)
                        }
                    })
                    
      }

    render(){
        return(
            <View>
                <Button block rounded light
                          onPress={()=>this.props.navigation.navigate("Walkthrough")}>
                          <Text>Walkthrough</Text>
                      </Button>
            </View>
        )
    }
}