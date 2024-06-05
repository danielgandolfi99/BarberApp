import { useNavigation } from "@react-navigation/native";
import { Button, Icon } from "@rneui/base";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Text,
  View,
} from "react-native";
import TextInputStyled from "../../components/TextInputStyled";
import { styles } from "../../components/stylesComponents";
import ButtonStyled from "../../components/ButtonStyled";
import TextTitleStyled from "../../components/TextTitleStyled";
import api from "../../services/api";
import { setToken } from "../../services/redux/authSlice";
import { useDispatch } from "react-redux";
import { StyleSheet } from "react-native";

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState(false);

  function isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  useEffect(() => {
    if (search) {
      api
        .post("/auth", {
          username: email,
          password: password,
        })
        .then((response) => {
          if (response && response.data) {
            const { access_token } = response.data;
            dispatch(setToken(access_token));
            navigation.navigate({ name: "Home Barbeiros" } as never);
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setMessage("E-mail ou senha incorreta.");
          }
        })
        .finally(() => {
          setSearch(false);
        });
    }
  }, [search]);

  // useEffect(() => {
  //   if (search) {
  //   }
  // }, [search]);

  const handleSubmit = () => {
    if (!email || !password) {
      // Alert.alert(
      //   "Formulário incompleto!",
      //   "Preencha todos os campos para entrar."
      // );
      setMessage("Preencha todos os campos para entrar.");
      // } else if (!isValidEmail()) {
      // Alert.alert(
      //   "Email Incorreto",
      //   "Por favor, insira um endereço de e-mail válido."
      // );
      // setMessage("Por favor, insira um endereço de e-mail válido.");
      // return;
      // } else if (password && password.length < 6) {
      // Alert.alert(
      //   "Senha Fraca",
      //   "A senha precisa conter pelo menos 6 caracteres."
      // );
      // setMessage("Insira uma senha válida com pelo menos 6 caracteres.");
    } else {
      console.log("Email: " + email);
      console.log("Senha: " + password);
      setMessage("");
      setSearch(true);
    }
  };

  const handleOpenCadastro = () => {
    navigation.navigate({ name: "Cadastro" } as never);
  };

  return (
    <View style={styles.container}>
      <TextTitleStyled />
      <View style={styles.row}>
        <Image
          source={require("../../../assets/login.png")}
          style={styles.img}
        />
      </View>
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
      <View>
        <Text style={{ color: "red" }}>{message}</Text>
      </View>
      <ButtonStyled name="Entrar" onPress={handleSubmit} />
      <View style={styles.row}>
        <Button
          title="Não possui conta? Cadastre-se"
          color="transparent"
          titleStyle={{
            fontFamily: "Montserrat_700Bold",
            fontSize: 12,
            textDecorationLine: "underline",
            color: "#fff",
          }}
          style={styles.button}
          onPress={handleOpenCadastro}
        />
      </View>
      <Modal
        transparent={true}
        animationType="none"
        visible={search}
        onRequestClose={() => {}}
      >
        <View style={stylesModal.modalBackground}>
          <View style={stylesModal.activityIndicatorWrapper}>
            <ActivityIndicator animating={search} size={50}/>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export const stylesModal = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 150,
    width: 150,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default Login;
