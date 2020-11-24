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
});
export default stylesTheme;
