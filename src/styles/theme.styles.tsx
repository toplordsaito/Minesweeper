import { StyleSheet } from "react-native";

const stylesTheme = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#212930",
  },
  innerContainer: {
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
    color: "white",
  },
  headerText:{
    marginTop: "15%",
    marginBottom: "15%",
    fontWeight: "bold",
    color: "white",
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
    color: "#2089DB",
  },
  buttonTitle: {
    color: "white",
  },
});
export default stylesTheme;
