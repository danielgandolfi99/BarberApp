import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import Cadastro from "../cadastro";

const Login = (): JSX.Element => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("Email: " + email);
    console.log("Senha: " + password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>BarberApp</Text>
      </View>
      <View style={styles.row}>
        <Image source={require("../../src/img/login.png")} style={styles.img} />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>E-mail</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Senha</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.row}>
        <Button
          title="Entrar"
          color="#9D4EDD"
          titleStyle={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
            fontSize: 20,
          }}
          buttonStyle={styles.button}
          onPress={handleSubmit}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.text2}>
          Não possui conta? Cadastre-se
        </Text>
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
    shadowColor: "#21232F",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 10,
    elevation: 4,
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
    fontFamily: "Montserrat",
    color: "#fff",
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 12,
  },
  text2: {
    fontFamily: "Montserrat",
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
    fontFamily: "Montserrat",
    fontSize: 48,
    color: "#fff",
    fontWeight: "bold",
  },
  img: {
    width: 295,
    height: 250,
  },
});
export default Login;
