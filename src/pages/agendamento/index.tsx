import {
  Text,
  View,
  StyleSheet,
  Modal,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Button } from "@rneui/base";
import { useEffect, useState, useRef } from "react";
import SelectedBarberModal from "../../components/Modals/SelectedBarberModal";
import api from "../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../../services/redux/store";
import { RegisterBarberProps } from "../../types/barber";
import { stylesModal } from "../login";
import { RegisterServiceProps } from "../../types/services";
import moment, { Moment } from "moment";
import "moment/locale/pt-br";
import { AgendamentoProps } from "../../types/agendamento";
import { Alert } from "react-native";
import { Dialog } from "@rneui/themed";

const PageAgendamento = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [barberId, setBarberId] = useState(0);
  const servicoId = useSelector(
    (state: RootState) => state.agendamento.idServico
  );
  const clienteId = useSelector((state: RootState) => state.user.cliente_id);
  const [search, setSearch] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [barber, setBarber] = useState<RegisterBarberProps>(
    {} as RegisterBarberProps
  );
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollX, setScrollX] = useState(0);
  const [freeTime, setFreeTime] = useState<number[]>([]);

  moment.locale("pt-br");
  const [service, setService] = useState<RegisterServiceProps>(
    {} as RegisterServiceProps
  );

  useEffect(() => {
    api
      .get(`/servicos/${servicoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response) {
          setService(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  const generateDates = (): Moment[] => {
    const dates = [];
    const currentDate = moment();
    for (let i = 0; i < 30; i++) {
      const date = currentDate.clone().add(i, "days");
      if (date.day() !== 0) {
        dates.push(date);
      }
    }
    return dates;
  };

  const dates = generateDates();
  const times = [
    { time: "09:00", value: 9 },
    { time: "10:00", value: 10 },
    { time: "11:00", value: 11 },
    { time: "12:00", value: 12 },
    { time: "13:00", value: 13 },
    { time: "14:00", value: 14 },
    { time: "15:00", value: 15 },
    { time: "16:00", value: 16 },
    { time: "17:00", value: 17 },
  ];

  const handleDateSelect = (date: Moment) => {
    setSelectedDate(date);
    setSelectedTime(null);
    const formatDate = date.format("YYYY-MM-DD");
    handleSearchDateTime(formatDate);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSearchDateTime = (date: string) => {
    api
      .get(`/barbeiros/${barber?.barbeiro_id}/horarios-livres?data=${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response) {
          setFreeTime(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleConfirm = () => {
    const selectedDateTime = `${selectedDate?.format(
      "YYYY-MM-DD"
    )} ${selectedTime}`;
    const startDate = moment(selectedDateTime, "YYYY-MM-DD HH:mm");
    const endDate = startDate.clone().add(1, "hour");

    const formattedStartDateTime = startDate.format("YYYY-MM-DD HH:mm");
    const formattedEndDateTime = endDate.format("YYYY-MM-DD HH:mm");

    const newRegister = {
      idServico: servicoId,
      idCliente: clienteId,
      dataInicio: formattedStartDateTime,
      dataFim: formattedEndDateTime,
    };

    api
      .post(`barbeiros/${barberId}/agendamento`, newRegister, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          Alert.alert("Agendamento realizado com sucesso!");
          navigation.goBack();
        }
      })
      .catch((error) => {
        Alert.alert(
          `Erro ${error.response.status}`,
          "Erro ao realizar cadastro."
        );
        console.log(error);
      });
  };

  const handleScroll = (event: any) => {
    setScrollX(event.nativeEvent.contentOffset.x);
  };

  // const getOpacity = (index: number) => {
  //   const screenWidth = Dimensions.get('window').width;
  //   const itemWidth = 63;
  //   const midPoint = (screenWidth - itemWidth) / 2;
  //   const itemCenter = itemWidth * index - scrollX + itemWidth / 2;
  //   const distanceFromCenter = Math.abs(midPoint - itemCenter);
  //   const maxDistance = screenWidth / 1;
  //   return scrollX === 0 && index === 0 ? 1 : 1 - Math.min(distanceFromCenter / maxDistance, 0.8);
  // };

  const checkDisabledTime = (dateTime: number): boolean => {
    if (!Array.isArray(freeTime) || freeTime.length === 0) {
      return true;
    }
    return !freeTime.includes(dateTime);
  };

  const closeModalConfirm = () => {
    setModalConfirm(false);
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Header
        title="Finalizar Atendimento"
        subtitle="Escolha um barbeiro e horário de atendimento"
        onNavegatePage={handleReturn}
      />
      {service && service.servico_id && (
        <View style={styles.row}>
          <Text style={styles.title1}>{service.descricao}</Text>
          <Text style={styles.subtitle1}>
            Total: <Text style={styles.subtitle2}>{service.valor}</Text>
          </Text>
        </View>
      )}
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
            <Text style={styles.nameBarber}>
              {barber?.nome ? barber.nome : "Selecione o barbeiro"}
            </Text>
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
      <View style={styles.row2}>
        {barber && barber.barbeiro_id && (
          <>
            <Text style={styles.subHeader}>
              Pra quando você gostaria de agendar?
            </Text>
            <ScrollView
              horizontal
              style={styles.dateContainer}
              showsHorizontalScrollIndicator={false}
              ref={scrollViewRef}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {dates.map((date, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dateItem,
                    selectedDate?.isSame(date, "day") &&
                      styles.selectedDateItem,
                  ]}
                  onPress={() => handleDateSelect(date)}
                >
                  <Text
                    style={[
                      styles.dayText,
                      selectedDate?.isSame(date, "day") && styles.selectedText,
                    ]}
                  >
                    {date.format("ddd").charAt(0).toUpperCase() +
                      date.format("ddd").slice(1)}
                  </Text>
                  <Text
                    style={[
                      styles.dateText,
                      selectedDate?.isSame(date, "day") && styles.selectedText,
                    ]}
                  >
                    {date.format("D")}
                  </Text>
                  <Text
                    style={[
                      styles.monthText,
                      selectedDate?.isSame(date, "day") && styles.selectedText,
                    ]}
                  >
                    {date.format("MMM").charAt(0).toUpperCase() +
                      date.format("MMM").slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
      </View>
      <View style={styles.row2}>
        {barber &&
          barber.barbeiro_id &&
          selectedDate &&
          freeTime &&
          freeTime.length > 0 && (
            <>
              <Text style={[styles.subHeader]}>Que horas?</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {times.map((dateTime, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.timeItem,
                      selectedTime === dateTime.time && styles.selectedTimeItem,
                      checkDisabledTime(dateTime.value) &&
                        styles.disabledTimeItem,
                    ]}
                    onPress={() => handleTimeSelect(dateTime.time)}
                    disabled={checkDisabledTime(dateTime.value)}
                  >
                    <Text
                      style={[
                        styles.timeText,
                        selectedTime === dateTime.time &&
                          styles.selectedTimeText,
                        checkDisabledTime(dateTime.value) &&
                          styles.disabledTextTimeItem,
                      ]}
                    >
                      {dateTime.time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}
      </View>
      {selectedDate && selectedTime && (
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => setModalConfirm(true)}
        >
          <Text style={styles.confirmButtonText}>
            Confirmar meu agendamento
          </Text>
        </TouchableOpacity>
      )}
      <Dialog
        animationType="slide"
        isVisible={modalConfirm}
        onBackdropPress={closeModalConfirm}
        style={{ backgroundColor: "#fff" }}
      >
        <Dialog.Title title="Excluir Atendimento" />
        <Text>Tem certeza que confirmar o atendimento?</Text>
        <View style={styles.dialogActions}>
          <Button
            color="transparent"
            title="Cancelar"
            titleStyle={{ color: "red" }}
            onPress={closeModalConfirm}
            buttonStyle={{ padding: 0 }}
          />
          <Button
            color="transparent"
            title="Confirmar"
            titleStyle={{ color: "green" }}
            onPress={handleConfirm}
            buttonStyle={{ padding: 0 }}
          />
        </View>
      </Dialog>
      <Modal transparent={true} visible={modal} onRequestClose={handleClose}>
        <SelectedBarberModal
          onSelectedBarberId={setBarberId}
          onClose={setModal}
          onSearch={setSearch}
        />
      </Modal>
      <Modal
        transparent={true}
        visible={search || !service.servico_id}
        onRequestClose={() => {}}
      >
        <View style={stylesModal.modalBackground}>
          <View style={stylesModal.activityIndicatorWrapper}>
            <ActivityIndicator
              animating={search || !service.servico_id}
              size={50}
            />
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
    fontSize: 20,
    color: "#000",
    marginBottom: 20,
    fontFamily: "Ubuntu_500Medium",
  },
  title2: {
    fontSize: 18,
    color: "#000",
    marginBottom: 20,
    fontFamily: "Ubuntu_500Medium",
  },
  subtitle1: {
    fontSize: 18,
    color: "#000",
    fontFamily: "Ubuntu_500Medium",
  },
  subtitle2: {
    fontSize: 18,
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
  subHeader: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Ubuntu_500Medium",
    marginBottom: 20,
  },
  dateContainer: {
    width: "100%",
  },
  dateItem: {
    width: 53,
    height: 68,
    marginRight: 8,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#C4C4C4",
    borderWidth: 1,
    opacity: 1,
  },
  dayText: {
    fontSize: 12,
    color: "#333",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  monthText: {
    fontSize: 12,
    color: "#333",
  },
  selectedDateItem: {
    backgroundColor: "#7B2CBF",
  },
  selectedText: {
    color: "#fff",
  },
  timeItem: {
    width: 96,
    height: 24,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  timeText: {
    fontSize: 14,
    color: "#333",
  },
  selectedTimeItem: {
    backgroundColor: "#7B2CBF",
  },
  selectedTimeText: {
    color: "#fff",
  },
  disabledTimeItem: {
    backgroundColor: "#F1F1F1",
  },
  disabledTextTimeItem: {
    color: "#fff",
  },
  confirmButton: {
    backgroundColor: "#7B2CBF",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    width: 335,
    height: 45,
    alignSelf: "center",
    marginTop: 50,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  dialogActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "flex-end",
  },
});

export default PageAgendamento;
