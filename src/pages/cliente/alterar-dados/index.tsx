import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  View,
  Alert,
  TouchableOpacity,
  Text,
  Modal,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import api from "../../../services/api";
import TextInputStyled from "../../../components/TextInputStyled";
import { stylesModal } from "../../login";
import ButtonStyled from "../../../components/ButtonStyled";
import Header from "../../../components/Header";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/redux/store";

const AlterarDadosCliente = () => {
  const navigation = useNavigation();
  const token = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.user.user_id);

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [celular, setCelular] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [search, setSearch] = useState(false);

  const handleUpdateUser = () => {
    setSearch(true);
    if (search) {
      const updateRegister = {
        nome: nome ? nome : null,
        sobrenome: sobrenome ? sobrenome : null,
        celular: celular ? celular : null,
        senha: password ? password : null,
      };
      api
        .patch(`/users/${userId}`, updateRegister, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            Alert.alert("Dados alterados com sucesso!");
            navigation.navigate({ name: "Tela Inicial" } as never);
          }
        })
        .catch((error) => {
          Alert.alert(
            `Erro ${error.response.status}`,
            "Erro ao alterar dados de cadastro."
          );
        })
        .finally(() => {
          setSearch(false);
        });
    }
  };

  function isValidCelular() {
    const celularRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    return celularRegex.test(celular);
  }

  const handleInputChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setCelular(numericValue);
  };

  function checkValidSubmit() {
    if (password !== confirmPassword) {
      Alert.alert("Senhas Incompatíveis", "As senhas não conferem!");
      return;
    }
    if (!nome && !sobrenome && !celular && !password) {
      Alert.alert(
        "Formulário incompleto",
        "Preencha pelo menos um campo para alterar!"
      );
      return;
    } else if (celular && !isValidCelular()) {
      Alert.alert(
        "Número de celular inválido",
        "Por favor, insira um número de celular válido."
      );
      return;
    } else if (password && password.length < 6) {
      Alert.alert(
        "Senha Fraca",
        "A senha precisa conter pelo menos 6 caracteres."
      );
      return;
    } else {
      handleUpdateUser();
    }
  }

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={stylesPage.container}>
      <Header
        title="Alterar Dados"
        subtitle="Altere suas informações de cadastro"
        onNavegatePage={goBack}
      />
      <ScrollView>
        <View style={stylesPage.row}>
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
            textName="Senha"
            value={password}
            setValue={setPassword}
            placeholder="Digite sua senha"
            secureTextEntry
            autoCapitalizeNone
          />
          <TextInputStyled
            textName="Confirmar Senha"
            value={confirmPassword}
            setValue={setConfirmPassword}
            placeholder="Confirme sua senha"
            secureTextEntry
            autoCapitalizeNone
          />
        </View>
        <View style={stylesPage.row2}>
          <ButtonStyled name="Confirmar" onPress={checkValidSubmit} />
        </View>
        <TouchableOpacity onPress={goBack}>
          <Text
            style={{
              fontFamily: "Montserrat_700Bold",
              alignItems: "center",
              textAlign: "center",
              fontSize: 20,
              color: "#fff",
              marginTop: 10,
            }}
          >
            Cancelar
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
export default AlterarDadosCliente;

const stylesPage = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  row: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  row2: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
