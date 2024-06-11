import { Avatar, Button, Card } from "@rneui/base";
import { Alert, Modal, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { Dialog } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import CameraSendImageModal from "../Modals/CameraSendImageModal";
import api from "../../services/api";
import { RegisterBarberProps } from "../../types/barber";
import { useSelector } from "react-redux";
import { RootState } from "../../services/redux/store";
import { useNavigation } from "@react-navigation/native";

export default function BarberRegistrationCard({
  barber,
}: {
  barber: RegisterBarberProps;
}) {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigation = useNavigation();

  const [deleteRegister, setDeleteRegister] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);

  const handleDeleteRegister = () => {
    api
      .delete(`/barbeiros/${barber.barbeiro_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response) {
          Alert.alert("Barbeiro deletado com sucesso!");
          navigation.navigate({ name: "Cadastro-Barbeiros" } as never);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        closeDeleteRegister();
      });
  };

  const closeDeleteRegister = () => {
    setDeleteRegister(false);
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
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      setImage(selectedImage.uri);
      handleUpdateImage();
    }
  };

  const handleUpdateImage = () => {
    const updateRegister = {
      imagem: image || "",
    };
    api
      .patch(`/barbeiros/${barber.barbeiro_id}`, updateRegister, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response) {
          Alert.alert("Barbeiro alterado com sucesso!");
          navigation.navigate({ name: "Cadastro-Barbeiros" } as never);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const imageBase64 = barber.imagem.data.reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, "");

    setImage(imageBase64);
  });

  return (
    <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
      <Card
        containerStyle={{
          height: 100,
          width: 335,
          justifyContent: "center",
          borderRadius: 3,
          padding: 0,
          backgroundColor: "#9D4EDD",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button onPress={() => setShowModal(true)} color="transparent">
            <Avatar
              size={80}
              rounded
              containerStyle={{ backgroundColor: "#D9D9D9" }}
              source={{ uri: image || " " }}
            />
          </Button>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontFamily: "Montserrat_700Bold", fontSize: 16 }}>
              {barber.nome}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={{ flexDirection: "column", marginEnd: 15 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Montserrat_700Bold",
                    fontSize: 12,
                  }}
                >
                  Agendados
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Montserrat_700Bold",
                    fontSize: 16,
                  }}
                >
                  0
                </Text>
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Montserrat_700Bold",
                    fontSize: 12,
                  }}
                >
                  Realizados
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Montserrat_700Bold",
                    fontSize: 16,
                  }}
                >
                  0
                </Text>
              </View>
            </View>
          </View>
          <Button
            containerStyle={{ alignSelf: "flex-end" }}
            color="transparent"
            buttonStyle={{ padding: 0, backgroundColor: "#b27edb" }}
            onPress={() => setDeleteRegister(true)}
          >
            <Icon name="deleteuser" color="#D62828" size={35} />
          </Button>
        </View>
      </Card>
      <Dialog
        animationType="slide"
        isVisible={deleteRegister}
        onBackdropPress={closeDeleteRegister}
        style={{ backgroundColor: "#fff" }}
      >
        <Dialog.Title title="Excluir Barbeiro" />
        <Text>Voce deseja excluir o barbeiro {barber.nome}?</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            alignItems: "flex-end",
          }}
        >
          <Button
            color="transparent"
            title="Cancelar"
            titleStyle={{ color: "red" }}
            onPress={closeDeleteRegister}
            buttonStyle={{ padding: 0 }}
          />
          <Button
            color="transparent"
            title="Confirmar"
            titleStyle={{ color: "green" }}
            onPress={handleDeleteRegister}
            buttonStyle={{ padding: 0 }}
          />
        </View>
      </Dialog>
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
    </View>
  );
}
