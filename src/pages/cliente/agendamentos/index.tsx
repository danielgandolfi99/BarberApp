import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Feather";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/redux/store";
import api from "../../../services/api";

const AgendaCliente = () => {
  const navigation = useNavigation();
  const token = useSelector((state: RootState) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const [agendamentos, setAgendamentos] = useState();

  const handleReturn = () => {
    navigation.goBack();
  };

  async function getData() {
    await api
      .get("/servicos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response && response.data) {
          setAgendamentos(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(47, 50, 67, 0.585)", "rgba(33, 35, 47, 0.765)"]}
        style={styles.gradient}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  headerImage: {
    width: "100%",
    height: 250,
    justifyContent: "flex-end",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  statusContainer: {
    position: "absolute",
    top: 135,
    left: 10,
    backgroundColor: "#06D6A0",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  statusText: {
    color: "#fff",
  },
  infoContainer: {
    position: "absolute",
    top: 171,
    left: 10,
  },
  title: {
    fontSize: 24,
    color: "#fff",
  },
  location: {
    fontSize: 14,
    color: "#F8F7FF",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 10,
    borderBottomColor: "#e0e0e0",
  },
  actionButton: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 20,
  },
  actionText: {
    marginTop: 5,
    fontSize: 12,
    color: "#3C3C43",
  },
  servicesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  servicesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  scheduleText: {
    flex: 1,
    fontSize: 12,
    color: "#2F3243",
    textAlign: "center",
  },
});

export default AgendaCliente;
