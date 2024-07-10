import React, { useEffect } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Button } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";
import TextInputStyled from "../TextInputStyled";
import { useState } from "react";
import ButtonStyled from "../ButtonStyled";
import Icon from "react-native-vector-icons/AntDesign";
import api from "../../services/api";
import { stylesModal } from "../../pages/login";
import { useSelector } from "react-redux";
import { RootState } from "../../services/redux/store";

interface BarberRegistrationModalProps {
  handleClose: () => void;
  onSearch: (search: boolean) => void;
}

export default function BarberRegistrationModal({
  handleClose,
  onSearch,
}: BarberRegistrationModalProps) {
  const token = useSelector((state: RootState) => state.auth.token);

  const [nome, setNome] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState(false);

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
    }
    return true;
  }

  const handleSubmit = () => {
    const check = checkValidSubmit();
    if (check) {
      setSearch(true);
    }
  };

  useEffect(() => {
    if (search) {
      const newRegister = {
        nome: nome,
        email: email,
        celular: celular,
        senha: password,
        imagem: null,
      };

      api
        .post("/barbeiros", newRegister, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response) {
            Alert.alert("Barbeiro cadastrado com sucesso!");
          }
        })
        .catch((error) => {
          Alert.alert(
            `Erro ${error.response.status}`,
            "Erro ao realizar cadastro."
          );
          console.log(error);
        })
        .finally(() => {
          setSearch(false);
          handleClose();
          onSearch(true);
        });
    }
  }, [search]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(123,44,191,1)", "rgba(34,29,37,1)"]}
        style={styles.modal}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 5,
          }}
        >
          <Text style={styles.title}>Cadastrar barbeiros</Text>
          <Button
            onPress={handleClose}
            color="transparent"
            containerStyle={{
              alignSelf: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Icon name="close" color="#fff" size={36} />
          </Button>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.modalContent}>
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
              phone
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
      <Modal
        transparent={true}
        animationType="none"
        visible={search}
        onRequestClose={() => {}}
      >
        <View style={stylesModal.modalBackground}>
          <View style={stylesModal.activityIndicatorWrapper}>
            <ActivityIndicator animating={search} size={50} />
          </View>
        </View>
      </Modal>
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
    height: "75%",
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
    marginLeft: 25,
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
});
