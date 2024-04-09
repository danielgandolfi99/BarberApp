import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { useState } from "react";
import { View, Alert } from "react-native";
import ButtonStyled from "../../components/ButtonStyled";
import { styles } from "../../components/stylesComponents";
import TextSubtitleStyled from "../../components/TextSubtitleStyled";
import TextTitleStyled from "../../components/TextTitleStyled";
import TextInputStyled from "../../components/TextInputStyled";

const Cadastro = () => {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidCelular() {
    const celularRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    return celularRegex.test(celular)
  }

  const handleSubmit = () => {
    if (!nome || !sobrenome || !celular || !email || !password) {
      Alert.alert("Formulário incompleto", "Preencha todos os campos!");
      return;
    }
    if (!isValidCelular()) {
      Alert.alert(
        "Número de celular inválido",
        "Por favor, insira um número de celular válido."
      );
      return;
    }
    if (!isValidEmail()) {
      Alert.alert(
        "Email Incorreto",
        "Por favor, insira um endereço de e-mail válido."
      );
      return;
    }
    if (password && password.length < 6) {
      Alert.alert(
        "Senha Fraca",
        "A senha precisa conter pelo menos 6 caracteres."
      );
      return;
    }
    Alert.alert(
        "Cadastro concluido",
        "O cadastro de usuário foi concluido com sucesso!"
    );
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextTitleStyled />
      <TextSubtitleStyled />
      <TextInputStyled
        textName="Nome"
        value={nome}
        setValue={setNome}
        placeholder="Digite seu nome"
        autoCapitalizeNone
      />
      <TextInputStyled
        textName="Sobrenome"
        value={sobrenome}
        setValue={setSobrenome}
        placeholder="Digite seu sobrenome"
        autoCapitalizeNone
      />
      <TextInputStyled
        textName="Celular"
        value={celular}
        setValue={setCelular}
        placeholder="Digite seu celular"
        autoCapitalizeNone
      />
      <TextInputStyled
        textName="E-mail"
        value={email}
        setValue={setEmail}
        placeholder="Digite seu e-mail"
        autoCapitalizeNone
      />
      <TextInputStyled
        textName="Senha"
        value={password}
        setValue={setPassword}
        placeholder="Digite sua senha"
        secureTextEntry
        autoCapitalizeNone
      />
      <View style={styles.row2}>
        <ButtonStyled name="Confirmar" onPress={handleSubmit} />
      </View>
    </View>

    
  );
};
export default Cadastro;
