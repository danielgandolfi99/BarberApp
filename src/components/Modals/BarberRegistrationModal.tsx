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
import { Avatar, Button, Dialog } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";
import TextInputStyled from "../TextInputStyled";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ButtonStyled from "../ButtonStyled";
import Icon from "react-native-vector-icons/AntDesign";
import CameraSendImageModal from "./CameraSendImageModal";
import * as ImagePicker from "expo-image-picker";
import { RegisterBarberProps } from "../../types/barber";
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
  // const [image, setImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
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
    // const check = checkValidSubmit();
    // if (check) {
    setSearch(true);
    // }
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

  // const pickImageFromGallery = async () => {
  //   setShowModal(false);
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (status !== "granted") {
  //     alert("O aplicativo não possui permissão para utilizar a câmera!");
  //     return;
  //   }

  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled && result.assets.length > 0) {
  //     const selectedImage = result.assets[0];
  //     setImage(selectedImage.uri);
  //   }
  // };

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
            {/* <Button onPress={() => setShowModal(true)} color="transparent">
              <Avatar
                size={80}
                rounded
                containerStyle={{ backgroundColor: "#D9D9D9" }}
                source={{ uri: image || " " }}
              />
            </Button> */}
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
      {/* <Dialog
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
      </Dialog> */}
      {/* <Modal visible={modalCamera} onRequestClose={() => setModalCamera(false)}>
        <CameraSendImageModal
          onClose={setModalCamera}
          onUpdateImage={() => setSearch(true)}
          onSetImage={setImage}
        />
      </Modal> */}
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
