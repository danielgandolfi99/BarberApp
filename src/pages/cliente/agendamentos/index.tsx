import {
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/redux/store";
import api from "../../../services/api";
import ClientScheduleCard from "../../../components/ClientScheduleCard";
import Header from "../../../components/Header";
import { AgendaClienteProps } from "../../../types/agendamento";

const AgendaCliente = () => {
  const navigation = useNavigation();
  const token = useSelector((state: RootState) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const [agendamentos, setAgendamentos] = useState<AgendaClienteProps[]>([]);
  const [search, setSearch] = useState(true);
  const clienteId = useSelector((state: RootState) => state.user.cliente_id);
  const [data, setData] = useState<AgendaClienteProps[]>([]);

  const handleReturn = () => {
    navigation.goBack();
  };

  const handleScheduleDeleted = () => {
    setSearch(true);
  };

  useEffect(() => {
    if (search) {
      api
        .get(`/clientes/${clienteId}/horarios`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response) {
            const sortedData = response.data.sort((a: AgendaClienteProps, b: AgendaClienteProps) => {
              if (a.finalizado !== b.finalizado) {
                return a.finalizado ? 1 : -1;
              }
              if (a.finalizado) {
                return new Date(b.dt_inicio).getTime() - new Date(a.dt_inicio).getTime();
              } else {
                return new Date(a.dt_inicio).getTime() - new Date(b.dt_inicio).getTime();
              }
            });
            setData(sortedData);
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

  return (
    <View style={styles.container}>
      <Header
        title="Meus agendamentos"
        subtitle="Gerencie seus agendamentos"
        onNavegatePage={handleReturn}
      />
      <ScrollView style={{ height: "80%" }}>
        {data &&
          data.length > 0 &&
          data.map((value, index) => (
            <ClientScheduleCard
              key={index}
              schedule={value}
              onScheduleDeleted={handleScheduleDeleted}
            />
          ))}
      </ScrollView>
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