import React, { Component } from 'react';
import { Container,  Content,  Grid, Row, Col } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import {GetProjectsModel,GetRoutesModel,GetVoyagesModel} from '../../models';
import MapService from '../../services/MapService';
import {AsyncStorage,Alert} from 'react-native';
import * as Constant from '../../data/Constants';
import { StyleSheet,TouchableOpacity,Text } from 'react-native';
import { Colors } from "../../../themes";

var StorageKeys=require('../../data/StorageKeys.json');

export default class WhereIsServiceModalScreen extends Component {
  mapService=new MapService();

  constructor(props){
    super(props);

    this.state = {
      projects:[],
      routes:[],
      voyages:[],
      passengerId:0,
      selectedProjectId:0,
      selectedRouteId:0,
      selectedVoyageId:0
    };

    this.getProjects=this.getProjects.bind(this);
    this.getRoutes=this.getRoutes.bind(this);
    this.getVoyages=this.getVoyages.bind(this);

    this.filterOperation=this.filterOperation.bind(this);
    this.exitOperation=this.exitOperation.bind(this);
    
    this.onProjectChangeEvent = this.onProjectChangeEvent.bind(this);
    this.onRouteChangeEvent = this.onRouteChangeEvent.bind(this);
    this.onVoyageChangeEvent = this.onVoyageChangeEvent.bind(this);
  }

  //component lifecycle
  shouldComponentUpdate( nextProps, nextState ){
    let isStateSame=(nextState.selectedProjectId === this.state.selectedProjectId &&
                     nextState.selectedRouteId === this.state.selectedRouteId && 
                     nextState.selectedVoyageId === this.state.selectedVoyageId);

    return !isStateSame;
  }

  componentDidMount(){
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        let passengerId="0",voyageId="0";

        stores.map((result, i, store) => {
          let key = store[i][0];
          let value = store[i][1];

          if(key==StorageKeys.PassengerDetailKey){
            var parsedUserDetail= JSON.parse(value);
             passengerId=parsedUserDetail["PassengerId"];
     
             this.getProjects(passengerId);
          }
          else if(key==StorageKeys.SelectedVoyageId)
            voyageId=value;
        });

        this.setState({
          selectedVoyageId:voyageId,
          passengerId:passengerId
        });

      });
    });
  }

  render() {
    return (
      <Container>
        <Content style={{ paddingLeft: 5, paddingRight: 5,paddingTop:30 }}> 
          <Dropdown label='Projeler' data={this.state.projects} onChangeText={this.onProjectChangeEvent}/>
          <Dropdown label='Güzergahlar' data={this.state.routes} onChangeText={this.onRouteChangeEvent}/>
          <Dropdown label='Seferler' data={this.state.voyages} onChangeText={this.onVoyageChangeEvent}/>

          <Grid style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5, marginTop: 20  }}>
              <Row style={{ alignContent: "center", alignItems: "center" }}>
                  <Col size={50} >
                    <TouchableOpacity
                              style={styles.filterButton}
                              onPress={this.filterOperation}
                              underlayColor='#fff'>
                              <Text style={styles.buttonText}>Filtrele</Text>
                    </TouchableOpacity>
                 </Col>
              </Row>
          </Grid>
          <Grid style={{ marginTop: 20 }}>
              <Row style={{ alignContent: "center", alignItems: "center" }}>
                  <Col size={50} >                 
                    <TouchableOpacity
                              style={styles.exitButton}
                              onPress={this.exitOperation}
                              underlayColor='#fff'>
                              <Text style={styles.buttonText}>İptal</Text>
                    </TouchableOpacity>
                  </Col>
              </Row>
          </Grid>
      </Content>
       </Container>
    );
  }

  //button events
  filterOperation(){          
    if(this.state.selectedProjectId==0){
      Alert.alert(Constant.ErrorText,"Proje seçmelisiniz")
      return;
    }   
    if(this.state.selectedRouteId==0){
      Alert.alert(Constant.ErrorText,"Güzergah seçmelisiniz")
      return;
    }   
    if(this.state.selectedVoyageId==0){
      Alert.alert(Constant.ErrorText,"Sefer seçmelisiniz")
      return;
    } 

    this.saveLocalStorage(true);
  }

  exitOperation(){    
    this.saveLocalStorage(false);
  }

  //operation
  saveLocalStorage(isPressFilter){
    let voyageId=isPressFilter?this.state.selectedVoyageId:0;

    AsyncStorage.multiSet([[StorageKeys.SelectedVoyageId,voyageId.toString()]]);

    this.props.navigation.goBack();
  }

  onProjectChangeEvent(selectedValue) {
    this.state.projects.map(project=>{
      if(project.value==selectedValue && project.key!=this.state.selectedProjectId){   
        this.getRoutes(project.key);

        this.setState({
          selectedProjectId:project.key
        });
      }
    })
  }

  onRouteChangeEvent(selectedValue) {
    this.state.routes.map(route=>{
      if(route.value==selectedValue && route.key!=this.state.selectedRouteId){    
        this.getVoyages(route.key);
            
        this.setState({
          selectedRouteId:route.key
        });
      }
    })
  }

  onVoyageChangeEvent(selectedValue) {
    this.state.voyages.map(voyage=>{
      if(voyage.value==selectedValue && voyage.key!=this.state.selectedVoyageId){        
        this.setState({
          selectedVoyageId:voyage.key
        });
      }
    })
  }

  getProjects(passengerId){
    var model=new GetProjectsModel();
    model.PassengerId=passengerId;

    this.mapService.getProjects(model).then(responseJson => {
        if (!responseJson.IsSuccess) {     
            return;       
        }

        responseJson.Data.Projects.map(project=>{
            this.state.projects.push({
              key:project.ProjectId,
              value:project.ProjectName
            })
        });
    }).catch((error) => {
        console.log(error);
    });
  }

  getRoutes(projectId){
    var model=new GetRoutesModel();
    model.PassengerId=this.state.passengerId;
    model.ProjectId=projectId;

    this.mapService.getRoutes(model).then(responseJson => {
        if (!responseJson.IsSuccess) {       
            return;       
        }

        responseJson.Data.Routes.map(route=>{
            this.state.routes.push({
              key:route.RouteId,
              value:route.RouteName
            })
        });
    }).catch((error) => {
        console.log(error);
    });
  }

  getVoyages(routeId){
    var model=new GetVoyagesModel();
    model.RouteId=routeId;

    this.mapService.getVoyages(model).then(responseJson => {
        if (!responseJson.IsSuccess) {       
            return;       
        }

        responseJson.Data.Voyages.map(voyage=>{
            this.state.voyages.push({
              key:voyage.VoyageId,
              value:voyage.VoyageDescription
            })
        });
    }).catch((error) => {
        console.log(error);
    });
  }
}

const styles = StyleSheet.create({
  filterButton:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:Colors.cetur,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  exitButton:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:Colors.frost,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  buttonText:{
      color:'#fff',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
  }
});