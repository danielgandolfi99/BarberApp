import { useNavigation } from "@react-navigation/native";
import { Button, Dialog } from "@rneui/base";
import { useEffect, useState } from "react";
import {
  View,
  Alert,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
// import { RegisterUserProps } from "../../types/user";
import api from "../../../services/api";
import TextInputStyled from "../../../components/TextInputStyled";
import { stylesModal } from "../../login";
import ButtonStyled from "../../../components/ButtonStyled";
import Header from "../../../components/Header";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/redux/store";
import { Avatar } from "@rneui/themed";
import CameraSendImageModal from "../../../components/Modals/CameraSendImageModal";
import * as ImagePicker from "expo-image-picker";

const AlterarDadosBarbeiro = () => {
  const navigation = useNavigation();
  const barbeiroId = useSelector((state: RootState) => state.user.barbeiro_id);
  const token = useSelector((state: RootState) => state.auth.token);

  const [nome, setNome] = useState("");
  const [celular, setCelular] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [search, setSearch] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);

  useEffect(() => {
    api
      .get(`/barbeiros/${barbeiroId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response && response.data) {
          setNome(response.data.nome);
          setCelular(response.data.celular);
          if (response.data.imagem) {
            const imageBase64 = response.data.imagem.data.reduce(
              (data: string, byte: number) => {
                return data + String.fromCharCode(byte);
              },
              ""
            );

            setImage(`data:image/png;base64,${btoa(imageBase64)}`);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUpdateImage = async () => {
    if (image) {
      try {
        const formData = new FormData();

        const fileType = image.split('.').pop();
        const fileUri = image.startsWith('file://') ? image : 'file://' + image;


        formData.append("imagem", {
          uri: fileUri,
          name: `image.${fileType}`,
          type: `image/${fileType}`,
        } as any);

        const response = await api.patch(
          `/barbeiros/${barbeiroId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          Alert.alert("Barbeiro alterado com sucesso!");
        } else {
          Alert.alert(
            "Erro ao alterar o barbeiro. Por favor, tente novamente."
          );
        }
      } catch (error) {
        Alert.alert("Erro ao alterar o barbeiro. Por favor, tente novamente.");
        console.log(error)
      } finally {
        setSearch(false);
      }
    }
  };

  const handleUpdateBarbeiro = async () => {
    const updateRegister = {
      nome: nome ? nome : null,
      celular: celular ? celular : null,
      senha: password ? password : null,
      imagem: null,
    };
    await api
      .patch(`/barbeiros/${barbeiroId}`, updateRegister, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          Alert.alert("Dados alterados com sucesso!");
          navigation.navigate({ name: "Home Barbeiros" } as never);
        }
      })
      .catch((error) => {
        Alert.alert(
          `Erro ${error.response.status}`,
          "Erro ao alterar dados de cadastro."
        );
      });
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
    if (!nome && !celular && !password) {
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
      handleUpdateBarbeiro();
    }
  }

  const goBack = () => {
    navigation.goBack();
  };

  const pickImageFromGallery = async () => {
    setShowModal(false);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("O aplicativo não possui permissão para utilizar a câmera!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      setImage(selectedImage.uri);
      setSearch(true);
    }
  };

  useEffect(() => {
    if (search) {
      handleUpdateImage();
    }
  }, [search]);

  return (
    <View style={stylesPage.container}>
      <Header
        title="Alterar Dados"
        subtitle="Altere suas informações de cadastro"
        onNavegatePage={goBack}
      />
      <ScrollView>
        <View style={stylesPage.row}>
          <Button onPress={() => setShowModal(true)} color="transparent">
            <Avatar
              size={120}
              rounded
              containerStyle={{ backgroundColor: "#D9D9D9" }}
              source={{ uri: image || " " }}
            />
          </Button>
          <TextInputStyled
            textName="Nome"
            value={nome}
            setValue={setNome}
            placeholder="Digite seu nome"
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
      <Dialog
        animationType="slide"
        transparent={true}
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
      >
        <View
          style={{
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 10,
            width: "100%",
          }}
        >
          <Image
            style={{
              flex: 1,
              resizeMode: "contain",
              height: 300,
              width: "100%",
            }}
            source={{ uri: image || "" }}
          />
          <View style={{ marginBottom: 15 }}>
            <Button
              title="Abrir Camera"
              color="#9D4EDD"
              onPress={() => {
                setModalCamera(true);
                setShowModal(false);
              }}
            />
          </View>
          <View style={{ marginBottom: 0 }}>
            <Button
              title="Abrir Galeria"
              color="#9D4EDD"
              onPress={pickImageFromGallery}
            />
          </View>
        </View>
      </Dialog>
      <Modal visible={modalCamera} onRequestClose={() => setModalCamera(false)}>
        <CameraSendImageModal
          onClose={setModalCamera}
          onUpdateImage={handleUpdateImage}
          onSetImage={setImage}
        />
      </Modal>
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
export default AlterarDadosBarbeiro;

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
