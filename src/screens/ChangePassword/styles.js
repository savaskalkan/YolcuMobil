import { Platform, StyleSheet, Dimensions } from "react-native";
// Screen Styles
const { width, height } = Dimensions.get("window");

import { Fonts, Metrics, Colors } from "../../../themes/";

const styles = StyleSheet.create({
  screenBg: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT,
    backgroundColor: "#373737"
  },

  logostyle: {
    alignSelf: "center",
    width: Metrics.WIDTH * 0.28,
    height: Metrics.WIDTH * 0.28,
    backgroundColor: "transparent",
    resizeMode: "contain"
  },
  backArrow: {
    marginTop: 10,
    width: 30,
    alignItems: "center"
  },
  header: {
    backgroundColor: "transparent",
    height: 56,
    borderBottomWidth: 0,
    ...Platform.select({
      ios: {},
      android: {
        paddingTop: 10
      }
    }),
    elevation: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  left: {
    flex: 0.5,
    backgroundColor: "transparent"
  },

  body: {
    flex: 2,
    alignItems: "center",
    backgroundColor: "transparent"
  },

  right: {
    flex: 0.5
  },
  view2: {
    marginTop: Metrics.HEIGHT * 0.15,
    borderRadius: 5,
    width: Metrics.WIDTH * 0.8,
    height: Metrics.HEIGHT * 0.33,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "transparent"
  },
  itememail: {
    alignSelf: "center",
    width: Metrics.WIDTH * 0.8,
    height: Metrics.HEIGHT * 0.08,
    marginTop:10
  },
  inputemail: {
    //fontFamily: Fonts.type.SFUIDisplayRegular,
    color: 'gray',
    fontSize:14,
  },

  iconitem: {
    color: Colors.white
  },

  buttondialogsignup: {
    backgroundColor: Colors.loginGreen,
    alignSelf: "center",
    marginTop: Metrics.HEIGHT * 0.12,
    borderRadius: 40,
    width: Metrics.WIDTH * 0.65,
    height: Metrics.HEIGHT * 0.07,
    justifyContent: "center"
  },
  buttonsignin: {
    alignSelf: "center",
    fontSize: 15,
    //fontFamily: Fonts.type.SFUIDisplaySemibold,
    color: "white"
  },

  view3: {
    width: Metrics.WIDTH,
    justifyContent: "center",
    backgroundColor: "transparent",
    flexDirection: "row",
    marginTop: Metrics.HEIGHT * 0.05,
    marginBottom: Metrics.HEIGHT * 0.05
  },

  buttontext: {
    alignSelf: "center",
    //fontFamily: Fonts.type.SFUIDisplayRegular,
    color: "white",
    fontSize: Fonts.moderateScale(16)
  },

  signInTxtBg: {
    paddingLeft: Metrics.WIDTH * 0.01
  }
});
export default styles;
