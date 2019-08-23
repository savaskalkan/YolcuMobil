import React,{Component} from "react";
import { View } from 'react-native';
import {Button,Text} from 'native-base'

export default class LoginScreen extends Component{
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