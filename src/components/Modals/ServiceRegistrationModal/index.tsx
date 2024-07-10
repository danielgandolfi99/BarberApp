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
import { useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import TextInputStyled from "../../TextInputStyled";
import ButtonStyled from "../../ButtonStyled";
import { RegisterServiceProps } from "../../../types/services";
import api from "../../../services/api";
import { stylesModal } from "../../../pages/login";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/redux/store";

interface ServiceRegistrationModalProps {
  handleClose: () => void;
  onServiceAdded: () => void;
}

export default function ServiceRegistrationModal({
  handleClose,
  onServiceAdded,
}: ServiceRegistrationModalProps) {
  const token = useSelector((state: RootState) => state.auth.token);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [search, setSearch] = useState(false);

  function checkValidSubmit(): boolean {
    if (!titulo || !valor) {
      Alert.alert("Formulário incompleto", "Preencha todos os campos!");
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
      const newService: RegisterServiceProps = {
        titulo: titulo,
        descricao: descricao,
        valor: parseFloat(valor),
      };
      api
        .post("/servicos", newService, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response) {
            Alert.alert(
              "Serviço cadastrado com sucesso!",
              "",
              [
                {
                  text: "OK",
                  onPress: () => {
                    handleClose();
                    onServiceAdded();
                  },
                },
              ],
              { cancelable: false }
            );
          }
        })
        .catch((error) => {
          Alert.alert(
            `Erro ${error.response.status}`,
            "Erro ao realizar cadastro do serviço."
          );
          console.log(error);
        })
        .finally(() => {
          setSearch(false);
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
          <Text style={styles.title}>Cadastrar Serviços</Text>
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
              textName="Titulo do Serviço"
              value={titulo}
              setValue={setTitulo}
              placeholder="Digite o titulo do serviço"
              autoCapitalizeNone
            />
            <TextInputStyled
              textName="Descrição do Serviço"
              value={descricao}
              setValue={setDescricao}
              placeholder="Digite a descrição do serviço"
              autoCapitalizeNone
            />
            <TextInputStyled
              textName="Preço do Serviço"
              value={valor}
              setValue={setValor}
              placeholder="Digite o preço do serviço"
              autoCapitalizeNone
              keyboardTypeNumeric
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
