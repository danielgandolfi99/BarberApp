import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import TextInputStyled from "../../components/TextInputStyled";
import { styles } from "../../components/stylesComponents";
import ButtonStyled from "../../components/ButtonStyled";
import TextTitleStyled from "../../components/TextTitleStyled";

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("Email: " + email);
    console.log("Senha: " + password);
  };

  const handleOpenCadastro = () => {
    navigation.navigate("Cadastro");
  };

  return (
    <View style={styles.container}>
      <TextTitleStyled />
      <View style={styles.row}>
        <Image source={require("../../../assets/login.png")} style={styles.img} />
      </View>
      <TextInputStyled textName="E-mail" value={email} setValue={setEmail}/>
      <TextInputStyled textName="Senha" value={password} setValue={setPassword}/>
      <ButtonStyled name="Entrar" onPress={handleSubmit} />
      <View style={styles.row}>
        <Text style={styles.text2} onPress={handleOpenCadastro}>
          Não possui conta? Cadastre-se
        </Text>
      </View>
    </View>
  );
};


export default Login;
