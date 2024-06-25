import { Text } from "@rneui/base";
import moment, { Moment } from "moment";
import { useRef, useState } from "react";
import { ActivityIndicator, Modal, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { View } from "react-native";
import Header from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import api from "../../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/redux/store";
import { AgendaBarbeiroProps } from "../../../types/agendamento";
import { stylesModal } from "../../login";
import ScheduleCard from "../../../components/ScheduleCard";

const Agenda = () => {
  const navigation = useNavigation();
  const token = useSelector((state: RootState) => state.auth.token);
  const barbeiroId = useSelector((state: RootState) => state.user.barbeiro_id);

  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [search, setSearch] = useState(false);
  const [data, setData] = useState<AgendaBarbeiroProps[]>([]);

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

  const handleDateSelect = (date: Moment) => {
    setSelectedDate(date);
    const formatDate = date.format("YYYY-MM-DD");
    setSearch(true);
    handleSearch(formatDate);
  };

  const handleSearch = (date: string) => {
    api
      .get(`/barbeiros/${barbeiroId}/horarios-agendados?data=${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response) {
          const sortedData = response.data.sort(
            (
              a: { dt_inicio: moment.MomentInput },
              b: { dt_inicio: moment.MomentInput }
            ) => {
              return (
                moment(a.dt_inicio, "DD/MM/YYYY HH:mm").toDate().getTime() -
                moment(b.dt_inicio, "DD/MM/YYYY HH:mm").toDate().getTime()
              );
            }
          );
          setData(sortedData);
        } 
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setSearch(false));
  };

  const handleReturn = () => {
    navigation.goBack();
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1, alignItems: "center" }}>
      <Header
        title="Minha Agenda"
        subtitle="Consulte e gerencie a sua agenda"
        onNavegatePage={handleReturn}
      />
      <View style={styles.row}>
        <Text style={styles.subHeader}>Selecione a data de consulta:</Text>
        <ScrollView
          horizontal
          style={styles.dateContainer}
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
          scrollEventThrottle={16}
        >
          {dates.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateItem,
                selectedDate?.isSame(date, "day") && styles.selectedDateItem,
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
      </View>
      <View>
        {data &&
          data.length > 0 &&
          data.map((schedule, index) => (
            <ScheduleCard
              key={index}
              schedule={schedule}
              onSearch={(formatDate) => handleSearch(formatDate)}
            />
          ))}
      </View>
      <Modal
        transparent={true}
        animationType="none"
        visible={search}
        onRequestClose={() => {}}
      >
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
    padding: 25,
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
});

export default Agenda;
