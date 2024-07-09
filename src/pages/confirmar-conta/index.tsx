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
import { useSelector } from "react-redux";
import { RootState } from "../../services/redux/store";

const ConfirmarConta = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState("");
  const userId = useSelector((state: RootState) => state.user.user_id);
  const token = useSelector((state: RootState) => state.auth.token);
  const barbeiroId = useSelector((state: RootState) => state.user.barbeiro_id);

  console.log(userId);

  const goBack = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    if (!code) {
      Alert.alert("Erro", "Por favor, digite um código.", [{ text: "OK" }]);
      return;
    }

    try {
      api
        .post(
          `/users/${userId}/confirmar-email`,
          {
            code: code,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            if (barbeiroId !== null) {
              navigation.navigate({ name: "Home Barbeiros" } as never);
            } else {
              navigation.navigate({ name: "Tela Inicial" } as never);
            }
          }
        })
        .catch((error) => {
          Alert.alert(
            `Erro ${error.response.status}`,
            "Erro ao confirmar conta."
          );
        });
    } catch {}
  };

  return (
    <View style={styles.container}>
      <TextTitleStyled />
      <View style={styles.row}>
        <Text style={styles.subtitle}>Confirmar Conta</Text>
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
          Digite o código que mandamos para o seu email, para confirmar a sua
          conta.
        </Text>
      </View>
      <TextInputStyled
        textName="Código"
        value={code}
        setValue={setCode}
        placeholder="Digite o código"
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

export default ConfirmarConta;
