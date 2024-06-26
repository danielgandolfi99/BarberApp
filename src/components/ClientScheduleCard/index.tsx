import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from "react-native";
import { Button, Card, Dialog } from "@rneui/base";
import Icon from 'react-native-vector-icons/Feather';
import { AgendaClienteProps } from "../../types/agendamento";
import StarRating from 'react-native-star-rating-widget';
import api from "../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../../services/redux/store";
import moment, { Moment } from "moment";

export default function ClientScheduleCard({
  schedule,
  onScheduleDeleted,
}: {
  schedule: AgendaClienteProps;
  onScheduleDeleted: () => void;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const token = useSelector((state: RootState) => state.auth.token)
  const [deleteSchedule, setDeleteSchedule] = useState(false);

  const handleEvaluate = () => {
    setModalVisible(true);
  };

  const handleRatingPress = (rating: number) => {
    setRating(rating);
    setModalVisible(false);
  };

  const closeDeleteSchedule = () => {
    setDeleteSchedule(false);
  };

  const handleDeleteSchedule = () => {
    console.log("Service Object:", schedule);
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

  return (
    <>
      <Card containerStyle={schedule.finalizado ? styles.cardContainerFinalizado : styles.cardContainer}>
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.serviceTitle}>{schedule.servico}</Text>
            <Text style={styles.serviceDetails}>Barbeiro: {schedule.barbeiro}</Text>
            <Text style={styles.serviceDetails}>Data: {moment(schedule.dt_inicio).format('DD/MM/YYYY HH:mm')}</Text>
            <Text style={styles.serviceDetails}>Preço: {schedule.valor}</Text>
          </View>
          <View style={styles.iconContainer}>
            {schedule.finalizado ? (
              <TouchableOpacity onPress={handleEvaluate} style={styles.iconButton}>
                <Icon name="star" size={25} color="#FFD700" style={styles.icon} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setDeleteSchedule(true)} style={styles.iconButton}>
                <Icon name="trash" size={25} color="#FF0000" style={styles.icon} />
              </TouchableOpacity>
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
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Avaliar Serviço</Text>
            <StarRating
              rating={rating}
              onChange={handleRatingPress}
              starSize={30}
              style={styles.starRating}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: "#f8f8f8",
  },
  cardContainerFinalizado: {
    padding: 0,
    borderRadius: 8,
    marginBottom: 4,
    backgroundColor: "#ececec",
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
    fontWeight: "bold",
    color: "#000",
  },
  serviceDetails: {
    fontSize: 14,
    color: "#666",
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconButton: {
    marginVertical: 5,
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
    backgroundColor: "#9D4EDD",
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