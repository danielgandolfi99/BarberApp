import React from "react";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Avatar } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";
import TextInputStyled from "../TextInputStyled";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ButtonStyled from "../ButtonStyled";

interface BarberRegistrationModalProps {
  handleClose: () => void;
}

export default function BarberRegistrationModal({
  handleClose,
}: BarberRegistrationModalProps) {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidCelular() {
    const celularRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    return celularRegex.test(celular);
  }

  const handleInputChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setCelular(numericValue);
  };

  function checkValidSubmit(): boolean {
    if (!nome || !celular || !email || !password) {
      Alert.alert("Formulário incompleto", "Preencha todos os campos!");
      return false;
    } else if (!isValidCelular()) {
      Alert.alert(
        "Número de celular inválido",
        "Por favor, insira um número de celular válido."
      );
      return false;
    } else if (!isValidEmail()) {
      Alert.alert(
        "Email Incorreto",
        "Por favor, insira um endereço de e-mail válido."
      );
      return false;
    } else if (password && password.length < 6) {
      Alert.alert(
        "Senha Fraca",
        "A senha precisa conter pelo menos 6 caracteres."
      );
      return false;
    } else {
      Alert.alert("Cadastro de barbeiro concluído com sucesso!");
    }
    return true;
  }

  const handleSubmit = () => {
    const check = checkValidSubmit();
    if (check) {
        handleClose();
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(123,44,191,1)", "rgba(34,29,37,1)"]}
        style={styles.modal}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>Cadastrar barbeiros</Text>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.close}>X</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.modalContent}>
            <Avatar
              size={80}
              rounded
              containerStyle={{ backgroundColor: "#D9D9D9" }}
            />
            <TextInputStyled
              textName="Nome"
              value={nome}
              setValue={setNome}
              placeholder="Digite seu nome"
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
              textName="Celular"
              value={celular}
              setValue={handleInputChange}
              placeholder="Digite seu celular"
              autoCapitalizeNone
              keyboardTypeNumeric
            />
            <TextInputStyled
              textName="Senha"
              value={password}
              setValue={setPassword}
              placeholder="Digite sua senha"
              secureTextEntry
              autoCapitalizeNone
            />
            <ButtonStyled name="Cadastrar" onPress={handleSubmit} />
            <TouchableOpacity onPress={handleClose}>
              <Text style={styles.text}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '75%',
  },
  scrollView: {
    flex: 1,
  },
  modalContent: {
    paddingTop: "5%",
    paddingBottom: "5%",
    alignItems: "center",
  },
  title: {
    marginTop: "5%",
    paddingLeft: "7%",
    fontFamily: "Montserrat_700Bold",
    fontSize: 18,
    color: "#fff",
  },
  text: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    color: "#fff",
    marginTop: 10,
  },
  close: {
    marginTop: "8%",
    paddingLeft: "32%",
    fontFamily: "Montserrat_700Bold",
    fontSize: 30,
    color: "#fff",
  },
});