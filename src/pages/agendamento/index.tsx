import {
  Text,
  View,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Button } from "@rneui/base";
import { useEffect, useState } from "react";
import SelectedBarberModal from "../../components/Modals/SelectedBarberModal";
import api from "../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../../services/redux/store";
import { RegisterBarberProps } from "../../types/barber";
import { stylesModal } from "../login";

const PageAgendamento = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [barberId, setBarberId] = useState(0);
  const [search, setSearch] = useState(false);
  const [barber, setBarber] = useState<RegisterBarberProps>(
    {} as RegisterBarberProps
  );

  useEffect(() => {
    if (search) {
      api
        .get(`/barbeiros/${barberId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response) {
            setBarber(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setSearch(false);
        });
    }
  }, [search]);

  const handleReturn = () => {
    navigation.goBack();
  };

  const handleClose = () => {
    setModal(false);
  };

  const handleImage = (imagem: { type?: string; data: any }) => {
    if (imagem) {
      const imageBase64 = imagem.data.reduce((data: string, byte: number) => {
        return data + String.fromCharCode(byte);
      }, "");
      return `data:image/png;base64,${btoa(imageBase64)}`;
    }
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1, alignItems: "center" }}>
      <Header
        title="Finalizar Atendimento"
        subtitle="Escolha um barbeiro e horário de atendimento"
        onNavegatePage={handleReturn}
      />
      <View style={styles.row}>
        <Text style={styles.title1}>Corte de cabelo masculino</Text>
        <Text style={styles.subtitle1}>
          Total: <Text style={styles.subtitle2}>R$ 45,00</Text>
        </Text>
      </View>
      <View style={styles.row2}>
        <Text style={styles.title2}>
          Por qual profissional você gostaria de ser atendido?
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar
              size={50}
              rounded
              containerStyle={{ backgroundColor: "#D9D9D9", marginRight: 10 }}
              source={{ uri: handleImage(barber.imagem) }}
            />
            <Text style={styles.nameBarber}>{barber?.nome ? barber.nome : 'Selecione o barbeiro'}</Text>
          </View>
          <Button
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            onPress={() => setModal(true)}
          >
            Escolher Profissional
          </Button>
        </View>
      </View>
      <Modal transparent={true} visible={modal} onRequestClose={handleClose}>
        <SelectedBarberModal
          onSelectedBarberId={setBarberId}
          onClose={setModal}
          onSearch={setSearch}
        />
      </Modal>
      <Modal transparent={true} visible={search} onRequestClose={() => {}}>
        <View style={stylesModal.modalBackground}>
          <View style={stylesModal.activityIndicatorWrapper}>
            <ActivityIndicator animating={search} size={50} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    width: "100%",
    padding: 30,
    marginTop: 30,
    backgroundColor: "#F1F1F1",
  },
  row2: {
    width: "100%",
    padding: 25,
  },
  title1: {
    fontSize: 18,
    color: "#000",
    marginBottom: 20,
    fontFamily: "Ubuntu_500Medium",
  },
  title2: {
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
    fontFamily: "Ubuntu_500Medium",
  },
  subtitle1: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Ubuntu_500Medium",
  },
  subtitle2: {
    fontSize: 16,
    color: "#06D6A0",
    textDecorationLine: "underline",
    fontFamily: "Ubuntu_500Medium",
  },
  nameBarber: {
    fontSize: 12,
    color: "#2F3243",
    fontFamily: "Ubuntu_400Regular",
  },
  button: {
    backgroundColor: "#fff",
    borderColor: "#D9D9D9",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 11,
    fontFamily: "Ubuntu_400Regular",
  },
});

export default PageAgendamento;
