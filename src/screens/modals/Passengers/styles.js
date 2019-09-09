import { Platform, StyleSheet } from "react-native";
import { Fonts, Metrics, Colors } from "../../../../themes/";

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#ebebeb"
  },

  HeaderBg: {
    backgroundColor: "transparent",
    borderBottomWidth: 1
  },

  left: {
    flex: 1
  },

  body: {
    flex: 3
  },

  right: {
    flex: 1
  },

  headertitle: {
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    color: "#ffffff",
    fontSize: Fonts.moderateScale(20)
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
  },

  NewsCategoryText: {
    color: Colors.cetur,
    textAlign: "center",
    marginBottom:15,
    ...Platform.select({
      ios: {
        fontSize: Fonts.moderateScale(22)
      },
      android: {
        fontSize: Fonts.moderateScale(25)
      }
    })
  },

  MapReanderBg: {
    width: Metrics.WIDTH,
    ...Platform.select({
      ios: {
        height: Metrics.HEIGHT * 0.54
      },
      android: {
        height: Metrics.HEIGHT * 0.51
      }
    }),
    backgroundColor: "#f5f5f5"
  },
  MainReanderBg: {
    width: Metrics.WIDTH,
    ...Platform.select({
      ios: {
        height: Metrics.HEIGHT * 0.44
      },
      android: {
        height: Metrics.HEIGHT * 0.41
      }
    }),
    backgroundColor: "#f5f5f5"
  },

  PassengerReanderBg: {
    width: Metrics.WIDTH,
    ...Platform.select({
      ios: {
        height: Metrics.HEIGHT * 0.80
      },
      android: {
        height: Metrics.HEIGHT * 0.78
      }
    }),
    backgroundColor: "#f5f5f5"
  },
  
  PassengerExitBg: {
    width: Metrics.WIDTH,
    ...Platform.select({
      ios: {
        height: Metrics.HEIGHT * 0.10
      },
      android: {
        height: Metrics.HEIGHT * 0.10
      }
    }),
    backgroundColor: "#f5f5f5"
  },

  mainContentBg: {
    alignSelf: "center",
    width: Metrics.WIDTH * 0.91
  },

  BusStopNumber: {
    color: "#31373d",
    fontSize: Fonts.moderateScale(13)
  },

  VoyagesLinkText: {
    color: "#6f6f6f",
    fontSize: Fonts.moderateScale(13),
    // fontFamily: Fonts.type.sfuiDisplaySemibold,
  },

  BusStopName: {
    color: Colors.cetur,
    fontSize: Fonts.moderateScale(18),
    // fontFamily: Fonts.type.sfuiDisplaySemibold,,
    width: Metrics.WIDTH * 0.9,
    ...Platform.select({
      ios: {
        marginTop: Metrics.HEIGHT * 0.01
      },
      android: {}
    })
  },

  CurrentBusStop: {
    color: "#6f6f6f",
    fontSize: Fonts.moderateScale(15),
    // fontFamily: Fonts.type.sfuiDisplaySemibold,,
    marginLeft: Metrics.HEIGHT * 0.01
  },

  PassengerName: {
    color: Colors.cetur,
    fontSize: Fonts.moderateScale(15),
    marginLeft: Metrics.HEIGHT * 0.005
  },

  PassengerGsmNumber: {
    color: "#31373d",
    fontSize: Fonts.moderateScale(14),
    marginTop: Metrics.HEIGHT * 0.01,
    marginLeft: Metrics.HEIGHT * 0.02
  },

  HorizontalDivider: {
    backgroundColor: "#d4d4d4",
    width: Metrics.WIDTH,
    height: 1,
    marginTop: Metrics.HEIGHT * 0.01,
    marginBottom: Metrics.HEIGHT * 0.01
  },

  MapMarker: {
    height: Metrics.HEIGHT * 0.03,
    width: Metrics.WIDTH * 0.03,
    resizeMode: "contain"
  }
});

export default styles;
