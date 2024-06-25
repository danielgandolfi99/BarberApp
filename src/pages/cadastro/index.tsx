import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { useEffect, useState } from "react";
import { View, Alert, TouchableOpacity, Text, Modal, ActivityIndicator } from "react-native";
import ButtonStyled from "../../components/ButtonStyled";
import { styles } from "../../components/stylesComponents";
import TextSubtitleStyled from "../../components/TextSubtitleStyled";
import TextTitleStyled from "../../components/TextTitleStyled";
import TextInputStyled from "../../components/TextInputStyled";
import api from "../../services/api";
import { RegisterUserProps } from "../../types/user";
import { stylesModal } from "../login";

const Cadastro = () => {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (search) {
      const newRegister: RegisterUserProps = {
        name: nome,
        surname: sobrenome,
        phone: celular,
        email: email,
        password: password,
      };
      api
        .post("/users", newRegister)
        .then((response) => {
          if (response) {
            Alert.alert(
              "Cadastro concluido com sucesso!",
              "Efetue o login para acessar sua conta."
            );
            navigation.navigate({ name: "Login" } as never);
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
        });
    }
  }, [search]);

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

  function checkValidSubmit() {
    if (!nome || !sobrenome || !celular || !email || !password) {
      Alert.alert("Formulário incompleto", "Preencha todos os campos!");
      return;
    } else if (!isValidCelular()) {
      Alert.alert(
        "Número de celular inválido",
        "Por favor, insira um número de celular válido."
      );
      return;
    } else if (!isValidEmail()) {
      Alert.alert(
        "Email Incorreto",
        "Por favor, insira um endereço de e-mail válido."
      );
      return;
    } else if (password && password.length < 6) {
      Alert.alert(
        "Senha Fraca",
        "A senha precisa conter pelo menos 6 caracteres."
      );
      return;
    } else {
      setSearch(true);
    }
  }

  const goBack = () => {
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
        setValue={handleInputChange}
        placeholder="Digite seu celular"
        autoCapitalizeNone
        keyboardTypeNumeric
        phone
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
        <ButtonStyled name="Confirmar" onPress={checkValidSubmit} />
      </View>
      <TouchableOpacity onPress={goBack}>
        <Text
          style={{
            fontFamily: "Montserrat_700Bold",
            fontSize: 20,
            color: "#fff",
            marginTop: 10,
          }}
        >
          Cancelar
        </Text>
      </TouchableOpacity>
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
};
export default Cadastro;
