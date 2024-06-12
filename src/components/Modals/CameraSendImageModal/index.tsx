import { Button } from "@rneui/themed";
import { Camera } from "expo-camera/legacy";
import { CameraType } from "expo-image-picker";
import { useRef, useState } from "react";
import { Image, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";

interface ModalProps {
  onClose: (modalCamera: boolean) => void;
  onUpdateImage: () => void;
  onSetImage: (image: string) => void;
}

export default function CameraSendImageModal({
  onClose,
  onUpdateImage,
  onSetImage,
}: ModalProps) {
  const cameraRef = useRef<Camera | null>(null);
  const [type, setType] = useState(CameraType.front);
  const [selectedImage, setSelectedImage] = useState<string>();

  const handleUpdateTypeCamera = () => {
    if (type === CameraType.front) {
      setType(CameraType.back);
    } else {
      setType(CameraType.front);
    }
  };

  console.log(selectedImage);


  const takePicture = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("O aplicativo não possui permissão para utilizar a câmera!");
      return;
    }

    try {
      if (cameraRef.current) {
        const { uri } = await cameraRef.current.takePictureAsync({ quality: 0.5  });
        // onSetImage(uri);
        setSelectedImage(uri);
        // onClose(false);
        // onUpdateImage();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCloseModal = () => {
    onClose(false);
  };

  const handleSaveImage = () => {
    if (selectedImage) {
      onSetImage(selectedImage);
      onUpdateImage();
      onClose(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!selectedImage ? (
        <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-end",
              marginBottom: 30,
            }}
          >
            <View
              style={{
                justifyContent: "flex-end",
                alignSelf: "flex-end",
                marginRight: 100,
                marginBottom: 20,
              }}
            >
              <Button
                color="transparent"
                icon={<Fontisto name="close" color="#fff" size={30} />}
                onPress={handleCloseModal}
              />
            </View>
            <View style={{ position: "absolute" }}>
              <Button
                color="#fff"
                radius={50}
                icon={<Icon name="camera" size={30} style={{ padding: 20 }} />}
                onPress={takePicture}
              />
            </View>
            <View
              style={{
                justifyContent: "flex-end",
                alignSelf: "flex-end",
                marginLeft: 100,
                marginBottom: 20,
              }}
            >
              <Button
                color="transparent"
                icon={<MaterialIcons name="cached" color="#fff" size={30} />}
                onPress={handleUpdateTypeCamera}
              />
            </View>
          </View>
        </Camera>
      ) : (
        <View style={{ flex: 1 }}>
          <Image
            style={{
              flex: 1,
              resizeMode: "contain",
              height: 300,
              width: "100%",
            }}
            source={{ uri: selectedImage || " " }}
          />
          <Button
            color="success"
            title="Salvar"
            containerStyle={{ marginBottom: 10 }}
            onPress={handleSaveImage}
          />
          <Button
            color="error"
            title="Cancelar"
            containerStyle={{ marginBottom: 10 }}
            onPress={() => setSelectedImage('')}
          />
        </View>
      )}
    </View>
  );
}
