import { Platform, StyleSheet } from "react-native";
import { Fonts, Metrics, Colors } from "../../../themes";
import { bold } from "ansi-colors";

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#ebebeb"
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

  content: {
		height: Metrics.HEIGHT * 0.9,
		width: Metrics.WIDTH,
		backgroundColor: '#f3f3f3'
  },
  
  rowBg: {
		width: Metrics.WIDTH * 0.9,
		alignSelf: 'center',
		backgroundColor: Colors.snow,
		marginBottom: (Metrics.WIDTH * 0.05),
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#ebebeb"
	},

	rowField: {
		flexDirection: 'row',
		marginLeft: Metrics.WIDTH * 0.01,
		marginRight: Metrics.WIDTH * 0.01,
		marginTop: Metrics.WIDTH * 0.02,
		marginBottom: Metrics.WIDTH * 0.02,
	},

	rowListDivider: {
		width: Metrics.WIDTH * 0.87,
		height: 1,
		backgroundColor: "#E1E1E1",
		marginLeft: Metrics.WIDTH * 0.03
	},

	fieldLabelTxt: {
		color: "#959595",
		fontSize: Fonts.moderateScale(15),
		fontFamily: Fonts.type.helveticaNeueLight,
		width: Metrics.WIDTH * 0.32,
		textAlign: 'left'
	},

	fieldDescriptionTxt: {
		color: "#111111",
		fontSize: Fonts.moderateScale(15),
		fontFamily: Fonts.type.helveticaNeueLight,
		width: Metrics.WIDTH * 0.48,
		marginLeft: Metrics.WIDTH * 0.03,
		textAlign: 'right',
	},
	fieldTimer: {
		color: "red",
		fontSize: Fonts.moderateScale(15),
		fontFamily: Fonts.type.helveticaNeueLight,
		width: Metrics.WIDTH * 0.48,
		marginLeft: Metrics.WIDTH * 0.03,
		textAlign: 'right',
	}
});

export default styles;
