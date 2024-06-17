import { useNavigation } from "@react-navigation/native";
import { styles } from "../../components/stylesComponents";
import { Alert, View } from "react-native";
import TextInputStyled from "../../components/TextInputStyled";
import TextTitleStyled from "../../components/TextTitleStyled";
import { Text } from "@rneui/base";
import ButtonStyled from "../../components/ButtonStyled";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import api from "../../services/api";

const RecuperarSenha = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const goBack = () => {
    navigation.goBack();
  };

  function isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSubmit = () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, digite um e-mail.", [{ text: "OK" }]);
      return;
    }

    if (!isValidEmail()) {
      Alert.alert("E-mail inválido", "Por favor, digite um e-mail válido.", [
        { text: "OK" },
      ]);
      return;
    }

    try {
      api
        .post("/users/redefinir-senha", {
          email: email,
        })
        .then((response) => {
          if (response.status === 200) {
            Alert.alert(
              "Sucesso",
              "A senha provisória foi enviada para o seu e-mail.",
              [{ text: "OK", onPress: goBack }]
            );
          } else {
            Alert.alert(
              "Erro ao alterar email",
              "Email não cadastrado no aplicativo.",
              [{ text: "OK", onPress: goBack }]
            );
          }
        })
        .catch((error) => {
          Alert.alert(
            "Erro ao alterar email",
            "Email não cadastrado no aplicativo.",
            [{ text: "OK", onPress: goBack }]
          );
        });
    } catch {}
  };

  return (
    <View style={styles.container}>
      <TextTitleStyled />
      <View style={styles.row}>
        <Text style={styles.subtitle}>Restaurar senha</Text>
      </View>

      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          marginBottom: 5,
          padding: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat_700Bold",
            color: "#fff",
            marginBottom: 5,
            fontSize: 16,
            lineHeight: 25,
          }}
        >
          Digite o seu email para enviarmos uma senha provisória que poderá ser
          trocada posteriormente.
        </Text>
      </View>
      <TextInputStyled
        textName="E-mail"
        value={email}
        setValue={setEmail}
        placeholder="Digite seu e-mail"
        autoCapitalizeNone
      />
      <ButtonStyled name="Enviar" onPress={handleSubmit} />
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
    </View>
  );
};

export default RecuperarSenha;
