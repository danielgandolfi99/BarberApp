import React, { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { Button, Card } from "@rneui/base";
import Icon from "react-native-vector-icons/AntDesign";
import api from "../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../../services/redux/store";
import { useNavigation } from "@react-navigation/native";
import { RegisterServiceProps } from "../../types/services";
import { Dialog } from "@rneui/themed";

export default function ServiceRegistrationCard({
  service,
  onServiceDeleted,
}: {
  service: RegisterServiceProps;
  onServiceDeleted: () => void;
}) {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigation = useNavigation();

  const [deleteService, setDeleteService] = useState(false);

  const handleDeleteService = () => {
    console.log("Service Object:", service);
    api
      .delete(`/servicos/${service.servico_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response) {
          Alert.alert(
              "Serviço excluido com sucesso!",
              "",
              [
                {
                  text: "OK",
                  onPress: () => {
                    onServiceDeleted();
                  },
                },
              ],
              { cancelable: false }
          );
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        closeDeleteService();
      });
  };

  const closeDeleteService = () => {
    setDeleteService(false);
  };

  return (
    <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
      <Card containerStyle={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{service.titulo}</Text>
            <Text style={styles.description}>{service.descricao}</Text>
            <Text style={styles.price}>R$ {service.valor}</Text>
          </View>
          <Button
            containerStyle={styles.deleteButtonContainer}
            color="transparent"
            buttonStyle={styles.deleteButton}
            onPress={() => setDeleteService(true)}
          >
            <Icon name="deleteuser" color="#D62828" size={35} />
          </Button>
        </View>
      </Card>
      <Dialog
        animationType="slide"
        isVisible={deleteService}
        onBackdropPress={closeDeleteService}
        style={{ backgroundColor: "#fff" }}
      >
        <Dialog.Title title="Excluir Serviço" />
        <Text>Tem certeza que deseja excluir o serviço {service.titulo}?</Text>
        <View style={styles.dialogActions}>
          <Button
            color="transparent"
            title="Cancelar"
            titleStyle={{ color: "red" }}
            onPress={closeDeleteService}
            buttonStyle={{ padding: 0 }}
          />
          <Button
            color="transparent"
            title="Confirmar"
            titleStyle={{ color: "green" }}
            onPress={handleDeleteService}
            buttonStyle={{ padding: 0 }}
          />
        </View>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 100,
    width: 335,
    justifyContent: "center",
    borderRadius: 3,
    padding: 0,
    backgroundColor: "#9D4EDD",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  textContainer: {
    flexDirection: "column",
    flex: 1,
  },
  title: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  description: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 12,
    color: "#fff",
    marginBottom: 5,
  },
  price: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    color: "#fff",
  },
  deleteButtonContainer: {
    alignSelf: "flex-end",
  },
  deleteButton: {
    padding: 0,
    backgroundColor: "#b27edb",
  },
  dialogActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "flex-end",
  },
});