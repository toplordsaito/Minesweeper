import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const stylesTheme = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: hp("10%"),
  },
  logoContainer: {
    alignItems: "center",
  },
  text:{
    marginTop: "15%",
    marginBottom: "15%",
    fontWeight: "bold",
  },
  headerText:{
    marginTop: hp("3%"),
    marginBottom: hp("2%"),
    fontWeight: "bold",
  },
  innerText: {
    color: "red",
  },
  image: {
    width: wp("50%"),
    height: wp("50%"),
  },
  longButton: {
    width: wp("96%"),
    height: hp("8%"),
    margin: wp("2%"),
  },
  button: {
    width: wp("46%"),
    height: hp("8%"),
    margin: wp("2%"),
  },
  sliderStyle: {
    width: wp("40%"),
    height: hp("6%"),
    marginLeft: wp("5%"),
    marginRight: wp("5%"),
  },
  pickerStyle: {
    width: wp("60%"),
    alignSelf: "center",
  },
  pickerItemStyle: {
    height: hp("15%"),
  }
});
export default stylesTheme;
