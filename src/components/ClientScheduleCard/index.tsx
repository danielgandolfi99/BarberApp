import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, Alert } from "react-native";
import { Button, Card, Dialog } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  AgendaClienteProps,
  AvaliacaoClienteProps,
} from "../../types/agendamento";
import StarRating from "react-native-star-rating-widget";
import api from "../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../../services/redux/store";
import moment from "moment";

export default function ClientScheduleCard({
  schedule,
  onScheduleDeleted,
  onSearch,
}: {
  schedule: AgendaClienteProps;
  onScheduleDeleted: () => void;
  onSearch: (search: boolean) => void;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const token = useSelector((state: RootState) => state.auth.token);
  const [deleteSchedule, setDeleteSchedule] = useState(false);

  const handleEvaluate = () => {
    setModalVisible(true);
  };

  const handleCloseRating = () => {
    setModalVisible(false);
  };

  const handleRatingPress = (newRating: number) => {
    setRating(Math.round(newRating));
  };

  const closeDeleteSchedule = () => {
    setDeleteSchedule(false);
  };

  const handleDeleteSchedule = () => {
    api
      .delete(`/horarios/${schedule.atendimento_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response) {
          Alert.alert(
            "Agendamento cancelado com sucesso!",
            "",
            [
              {
                text: "OK",
                onPress: () => {
                  onScheduleDeleted();
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
        closeDeleteSchedule();
      });
  };

  const handleSetRating = () => {
    const newRating: AvaliacaoClienteProps = {
      idAtendimento: schedule.atendimento_id,
      value: rating,
    };
    api
      .post("/horarios/avaliacoes", newRating, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response) {
          Alert.alert("Avaliação realizada com sucesso!", "");
        }
      })
      .catch((error) => {
        Alert.alert(
          `Erro ${error.response.status}`,
          "Erro ao realizar avaliação."
        );
        console.log(error);
      })
      .finally(() => {
        handleCloseRating();
        onSearch(true);
      });
  };

  return (
    <>
      <Card containerStyle={styles.cardContainer}>
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.serviceTitle}>
              {schedule.descricao_servico}
            </Text>
            <Text style={styles.serviceDetails}>
              Barbeiro: {schedule.nome_barbeiro}
            </Text>
            <Text style={styles.serviceDetails}>
              Data:{" "}
              {moment(schedule.dt_inicio)
                .add(3, "hours")
                .format("DD/MM/YYYY HH:mm")}
            </Text>
            <Text style={styles.serviceDetails}>
              Preço: R$ {schedule.valor}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            {schedule.finalizado ? (
              schedule.avaliacao ? (
                <Icon
                  name="star"
                  size={30}
                  color="#Feefde"
                  style={{ margin: 10 }}
                  onPress={handleEvaluate}
                />
              ) : (
                <Button
                  containerStyle={{ alignSelf: "flex-end" }}
                  color="transparent"
                  buttonStyle={styles.iconButton}
                  onPress={handleEvaluate}
                >
                  <Icon name="star" size={30} color="#FFD700" />
                </Button>
              )
            ) : (
              <Button
                containerStyle={{ alignSelf: "flex-end" }}
                color="transparent"
                buttonStyle={styles.iconButton}
                onPress={() => setDeleteSchedule(true)}
              >
                <Icon name="delete" color="#D62828" size={30} />
              </Button>
            )}
          </View>
        </View>
        <Dialog
          animationType="slide"
          isVisible={deleteSchedule}
          onBackdropPress={closeDeleteSchedule}
          overlayStyle={styles.dialogOverlay}
        >
          <Dialog.Title title="Cancelar agendamento" />
          <Text>Tem certeza que deseja cancelar o agendamento?</Text>
          <View style={styles.dialogActions}>
            <Button
              color="transparent"
              title="Cancelar"
              titleStyle={{ color: "red" }}
              onPress={closeDeleteSchedule}
              buttonStyle={{ padding: 0 }}
            />
            <Button
              color="transparent"
              title="Confirmar"
              titleStyle={{ color: "green" }}
              onPress={handleDeleteSchedule}
              buttonStyle={{ padding: 0 }}
            />
          </View>
        </Dialog>
      </Card>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={handleCloseRating}
      >
        <View style={styles.modalContainer}>
          {!schedule.avaliacao ? (
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Avaliar Serviço</Text>
              <StarRating
                rating={rating}
                maxStars={5}
                onChange={handleRatingPress}
                starSize={40}
                style={styles.starRating}
              />
              <View style={styles.dialogActions}>
                <Button
                  color="transparent"
                  title="Cancelar"
                  titleStyle={{ color: "red" }}
                  onPress={handleCloseRating}
                  buttonStyle={{ padding: 0, marginRight: 40 }}
                />
                <Button
                  color="transparent"
                  title="Confirmar"
                  titleStyle={{ color: "green" }}
                  onPress={handleSetRating}
                  buttonStyle={{ padding: 0 }}
                />
              </View>
            </View>
          ) : (
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Avaliação já realizada</Text>
              <StarRating
                rating={schedule.avaliacao}
                maxStars={5}
                onChange={() => {}}
                starSize={40}
                style={styles.starRating}
              />
              <View style={styles.dialogActions}>
                <Button
                  color="#9D4EDD"
                  title="Fechar"
                  titleStyle={{ color: "#fff" }}
                  onPress={handleCloseRating}
                  buttonStyle={{ padding: 10, borderRadius: 5 }}
                />
              </View>
            </View>
          )}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 0,
    borderRadius: 8,
    marginBottom: 4,
    backgroundColor: "#9D4EDD",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  serviceTitle: {
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
    color: "#fff",
  },
  serviceDetails: {
    fontSize: 14,
    fontFamily: "Montserrat_500Medium",
    color: "#fff",
  },
  iconContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  iconButton: {
    padding: 1,
    backgroundColor: "#b27edb",
  },
  icon: {
    marginHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  starRating: {
    marginVertical: 10,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  dialogActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "flex-end",
  },
  dialogOverlay: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 25,
  },
});
