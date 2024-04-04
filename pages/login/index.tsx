import { Button } from "@rneui/base";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>E-mail</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Senha</Text>
        <TextInput style={styles.input} />
        
      </View>
      <View style={styles.row}>
        <View>
          <Button
            title="Entrar"
            color="#9D4EDD"
            titleStyle={{    fontFamily: "Montserrat",
            fontWeight: "bold",
            fontSize: 20,
          alignItems: 'center'}}
          buttonStyle={{alignItems: 'center', justifyContent: 'center'}}
            // color="error"
            containerStyle={styles.button}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7B2CBF",
    shadowColor: "#7B2CBF",
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
    shadowOpacity: 0.5, // Opacidade da sombra
    shadowRadius: 2, // Raio da sombra
    elevation: 1,
  },
  row: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  input: {
    width: 295,
    height: 40,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#9D4EDD",
    
    shadowColor:'#7B2CBF',
    shadowOffset: {
        width: 2,
        height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 10,
    elevation: 4,
    
  },
  text: {
    fontFamily: 'Montserrat',
    color: "#fff",
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 12,
  },
  button: {
    width: 201,
    height: 40,
    borderRadius: 10,
    overflow: "hidden",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 20,
  },
});
export default Login;
