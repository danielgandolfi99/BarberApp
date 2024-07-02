import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, ActivityIndicator } from "react-native";
import { Avatar, Button } from "@rneui/base";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/redux/store";
import api from "../../../services/api";
import { RegisterBarberProps } from "../../../types/barber";
import { stylesModal } from "../../../pages/login";

interface DataProps {
  onSelectedBarberId: (barberId: number) => void;
  onClose: (modal: boolean) => void;
  onSearch: (search: boolean) => void;
}

export default function SelectedBarberModal({
  onSelectedBarberId,
  onClose,
  onSearch,
}: DataProps) {
  const token = useSelector((state: RootState) => state.auth.token);
  const [data, setData] = useState<RegisterBarberProps[]>([]);
  const [search, setSearch] = useState(true);

  useEffect(() => {
    if (search) {
      api
        .get("/barbeiros", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response) {
            setData(response.data);
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

  const handleImage = (imagem: { type?: string; data: any }) => {
    if (imagem) {
      const imageBase64 = imagem.data.reduce((data: string, byte: number) => {
        return data + String.fromCharCode(byte);
      }, "");
      return `data:image/png;base64,${btoa(imageBase64)}`;
    }
  };

  const handleSelectedBarber = (barbeiroId: number) => {
    onSelectedBarberId(barbeiroId);
    onClose(false);
    onSearch(true);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: !search ? "rgba(0,0,0,0.5)" : "transparent",
      }}
    >
      {search ? (
        <Modal transparent={true} visible={search} onRequestClose={() => {}}>
          <View style={stylesModal.modalBackground}>
            <View style={stylesModal.activityIndicatorWrapper}>
              <ActivityIndicator animating={search} size={50} />
            </View>
          </View>
        </Modal>
      ) : (
        data &&
        data.length > 0 && (
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Escolha um barbeiro de sua preferência
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {data.map((value, index) => (
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                    width: "33%",
                  }}
                  key={index}
                >
                  <Button
                    color="transparent"
                    onPress={() =>
                      handleSelectedBarber(
                        value.barbeiro_id ? value.barbeiro_id : 0
                      )
                    }
                  >
                    <Avatar
                      rounded
                      size={60}
                      source={{ uri: handleImage(value.imagem) }}
                      containerStyle={{ backgroundColor: "#D9D9D9" }}
                    />
                  </Button>
                  <Text style={styles.nameBarber}>{value.nome}</Text>
                </View>
              ))}
            </View>
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Ubuntu_500Medium",
  },
  nameBarber: {
    fontSize: 14,
    color: "#2F3243",
    fontFamily: "Ubuntu_400Regular",
  },
});
