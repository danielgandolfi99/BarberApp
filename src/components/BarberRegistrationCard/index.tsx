import { Avatar, Button, Card } from "@rneui/base";
import { Modal, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useRef, useState } from "react";
import { Dialog } from "@rneui/themed";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

export interface BarberRegistrationCardProps {
  name: string;
  scheduled: number;
  performed: number;
  //   image: string;
}

export default function BarberRegistrationCard({
  name,
  scheduled,
  performed,
}: BarberRegistrationCardProps) {
  const [deleteRegister, setDeleteRegister] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const cameraRef = useRef<Camera | null>(null);

  const handleDeleteRegister = () => {
    closeDeleteRegister();
  };

  const closeDeleteRegister = () => {
    setDeleteRegister(false);
  };

  const takePicture = async () => {
    setShowModal(false);
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImage(photo.uri);
    }
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
      setImage(selectedImage.uri || '');
    }
  };

  return (
    <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
      <Card
        containerStyle={{
          height: 100,
          width: 335,
          justifyContent: "center",
          borderRadius: 3,
          padding: 8,
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
          <Button
            onPress={() => setShowModal(true)}
            style={{ marginRight: 10 }}
          >
            <Avatar
              size={80}
              rounded
              containerStyle={{ backgroundColor: "#D9D9D9" }}
            />
          </Button>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontFamily: "Montserrat_700Bold", fontSize: 16 }}>
              {name}
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
                  {scheduled}
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
                  {performed}
                </Text>
              </View>
            </View>
          </View>
          <Button
            color="transparent"
            containerStyle={{ alignSelf: "flex-end" }}
            buttonStyle={{ padding: 0 }}
            onPress={() => setDeleteRegister(true)}
          >
            <Icon name="deleteuser" color="#D62828" size={35} />
          </Button>
        </View>
      </Card>
      <Dialog
        isVisible={deleteRegister}
        onBackdropPress={closeDeleteRegister}
        style={{ backgroundColor: "#fff" }}
      >
        <Dialog.Title title="Excluir Barbeiro" />
        <Text>Voce deseja excluir o barbeiro {name}?</Text>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 10,
              width: "80%",
            }}
          >
            <Button title="Abrir Camera" onPress={takePicture} />
            <Button title="Abrir Galeria" onPress={pickImageFromGallery} />
            <Button title="Cancelar" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
      <Camera
        style={{ height: 0, width: 0, position: "absolute" }}
        ref={(ref: any) => {
          cameraRef.current = ref;
        }}
      />
    </View>
  );
}
