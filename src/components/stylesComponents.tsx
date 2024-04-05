import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    row: {
      flexDirection: "column",
      alignItems: "flex-start",
      marginBottom: 15,
    },
    input: {
      width: 295,
      height: 40,
      borderRadius: 10,
      padding: 10,
      color: '#fff',
      backgroundColor: "#9D4EDD",
      shadowColor: "#7B2CBF",
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0,
      shadowRadius: 10,
      elevation: 4,
    },
    text: {
      // fontFamily: "Montserrat",
      color: "#fff",
      marginBottom: 5,
      fontWeight: "bold",
      fontSize: 12,
    },
    text2: {
      // fontFamily: "Montserrat",
      color: "#fff",
      marginTop: 15,
      fontWeight: "bold",
      fontSize: 12,
      textDecorationLine: "underline",
    },
    button: {
      marginTop: 20,
      width: 201,
      height: 40,
      borderRadius: 10,
      padding: 1,
    },
    title: {
      // fontFamily: "Montserrat",
      fontSize: 48,
      color: "#fff",
      fontWeight: "bold",
    },
    img: {
      width: 403,
      height: 275,
    },
  });