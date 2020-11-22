import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const stylesTheme = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: "25%",
    marginBottom: "15%",
    fontWeight: "bold",
  },
  innerText: {
    color: "red",
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: "15%",
  },
  button: {
    margin: "2%",
  },
});
export default stylesTheme;
