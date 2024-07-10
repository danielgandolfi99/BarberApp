import React, { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { Button, Card } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconCheck from "react-native-vector-icons/Ionicons";
import api from "../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../../services/redux/store";
import { Dialog } from "@rneui/themed";
import { AgendaBarbeiroProps } from "../../types/agendamento";
import moment from "moment";
import { formatPhone } from "../../utils/formatPhone";

export default function ScheduleCard({
  schedule,
  onSearch,
}: {
  schedule: AgendaBarbeiroProps;
  onSearch: (formatDate: string) => void;
}) {
  const token = useSelector((state: RootState) => state.auth.token);

  const startTime = moment(schedule.dt_inicio, "DD/MM/YYYY HH:mm").format(
    "HH:mm"
  );
  const endTime = moment(schedule.dt_fim, "DD/MM/YYYY HH:mm").format("HH:mm");
  const [deleteSchedule, setDeleteSchedule] = useState(false);
  const [confirmSchedule, setConfirmSchedule] = useState(false);

  const handleDeleteSchedule = () => {
    api
      .delete(`/horarios/${schedule.atendimento_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response) {
          Alert.alert("Agendamento deletado com sucesso!");
          const formatDate = moment(schedule.dt_fim, "DD/MM/YYYY HH:mm").format(
            "YYYY-MM-DD"
          );
          onSearch(formatDate);
        }
      })
      .catch((error) => {
        Alert.alert(
          `Erro ${error.response.status}`,
          "Erro ao deletar agendamento."
        );
      })
      .finally(() => {
        closeDeleteSchedule();
      });
  };

  const handleConfirmSchedule = () => {
    api
      .patch(`/atendimentos/${schedule.atendimento_id}/status-atendimento?status=1`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          Alert.alert("Agendamento finalizado com sucesso!");
          const formatDate = moment(schedule.dt_fim, "DD/MM/YYYY HH:mm").format(
            "YYYY-MM-DD"
          );
          onSearch(formatDate);
        }
      })
      .catch((error) => {
        Alert.alert(
          `Erro ${error.response.status}`,
          "Erro ao finalizar agendamento."
        );
      })
      .finally(() => {
        closeDeleteSchedule();
      });
  };

  const closeDeleteSchedule = () => {
    setDeleteSchedule(false);
  };

  const closeConfirmSchedule = () => {
    setConfirmSchedule(false);
  };

  return (
    <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
      <Card containerStyle={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{schedule.nome_completo}</Text>
            <Text style={styles.description}>
              {schedule.titulo} {" - "} {"R$" + schedule.valor}
            </Text>
            <Text style={styles.subtitle}>
              Contato:{" "}
              {schedule.celular && formatPhone({ phone: schedule.celular })}
            </Text>
            <Text style={styles.subtitle}>
              Horário: {startTime} - {endTime}
            </Text>
          </View>
          <Button
            containerStyle={styles.deleteButtonContainer}
            color="transparent"
            buttonStyle={styles.deleteButton}
            onPress={() => setDeleteSchedule(true)}
          >
            <Icon name="delete" color="#D62828" size={30} />
          </Button>
          <Button
            containerStyle={styles.deleteButtonContainer}
            color="transparent"
            buttonStyle={styles.deleteButton}
            onPress={() => setConfirmSchedule(true)}
          >
            <IconCheck
              name="checkmark-circle"
              color="green"
              size={30}
            />
          </Button>
        </View>
      </Card>
      <Dialog
        animationType="slide"
        isVisible={deleteSchedule}
        onBackdropPress={closeDeleteSchedule}
        style={{ backgroundColor: "#fff" }}
      >
        <Dialog.Title title="Excluir Atendimento" />
        <Text>
          Tem certeza que deseja excluir o atendimento com{" "}
          {schedule.nome_completo}?
        </Text>
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
      <Dialog
        animationType="slide"
        isVisible={confirmSchedule}
        onBackdropPress={closeConfirmSchedule}
        style={{ backgroundColor: "#fff" }}
      >
        <Dialog.Title title="Finalizar Atendimento" />
        <Text>
          Tem certeza que deseja finalizar o atendimento com{" "}
          {schedule.nome_completo}?
        </Text>
        <View style={styles.dialogActions}>
          <Button
            color="transparent"
            title="Cancelar"
            titleStyle={{ color: "red" }}
            onPress={closeConfirmSchedule}
            buttonStyle={{ padding: 0 }}
          />
          <Button
            color="transparent"
            title="Confirmar"
            titleStyle={{ color: "green" }}
            onPress={handleConfirmSchedule}
            buttonStyle={{ padding: 0 }}
          />
        </View>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 110,
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
  subtitle: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 14,
    color: "#fff",
  },
  deleteButtonContainer: {
    alignSelf: "flex-end",
    margin: 5,
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
