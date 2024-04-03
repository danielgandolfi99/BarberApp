import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>Email</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Senha</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.row}>
        <View style={styles.button}>
          <Button title="Entrar" color="#9D4EDD"></Button>
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
    backgroundColor: "#72A9BB",
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
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#7B2CBF",
  },
  text: {
    // fontFamily: 'Montserrat',
    color: "#fff",
    marginBottom: 5,
    fontWeight: "500",
    fontSize: 12,
  },
  button: {
    width: 201,
    height: 40,
    borderRadius: 10,
    overflow: "hidden",
  },
});
export default Login;
