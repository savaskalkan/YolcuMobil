import { Platform, StyleSheet } from "react-native";
import { Metrics, Fonts,Colors } from "../../../themes";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.cetur
  },

  MainBG: {
    width: Metrics.WIDTH,
    backgroundColor: Colors.cetur,
    height: Metrics.HEIGHT * 0.9
  },

  NewsCategoryText: {
    color: "#fff",
    textAlign: "center",
    marginTop: Metrics.HEIGHT * 0.15,
    ...Platform.select({
      ios: {
        fontSize: Fonts.moderateScale(22)
      },
      android: {
        fontSize: Fonts.moderateScale(25)
      }
    })
  },

  ChangeLaterText: {
    color: "#fff",
    textAlign: "center",
    fontSize: Fonts.moderateScale(14)
  },

  listContent: {
    marginTop: Metrics.HEIGHT * 0.03
  },

  rowMain: {
    width: Metrics.WIDTH * 0.44,
    ...Platform.select({
      ios: {
        height: Metrics.WIDTH * 0.29
      },
      android: {
        height: Metrics.WIDTH * 0.31
      }
    }),
    marginBottom: Metrics.WIDTH * 0.04,
    marginHorizontal: Metrics.WIDTH * 0.02
  },

  imagebg: {
    width: Metrics.WIDTH * 0.44,
    ...Platform.select({
      ios: {
        height: Metrics.WIDTH * 0.29
      },
      android: {
        height: Metrics.WIDTH * 0.31
      }
    }),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Metrics.WIDTH * 0.02
  },

  catName: {
    //fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.moderateScale(16),
    color: "#fff",
    textAlign: "center"
  },

  SelectedText: {
    color: "#fff",
    //fontFamily: Fonts.type.robotoRegular,
    textAlign: "center",
    fontSize: Fonts.moderateScale(16),
    alignSelf: "center",
    justifyContent: "center",
    width: Metrics.WIDTH * 0.8
  },

  NextText: {
    fontSize: Fonts.moderateScale(16),
    color: "#fff",
    textAlign: "center",
    textAlign: "center"
  }
});

export default styles;
