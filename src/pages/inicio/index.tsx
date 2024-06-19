import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Feather";
import { useState, useEffect } from "react";
import { RootState } from "../../services/redux/store";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import api from "../../services/api";
import { RegisterServiceProps } from "../../types/services";
import ServiceCard from "../../components/ServiceCard";
import { stylesModal } from "../login";

const TelaInicial = () => {
  const navigation = useNavigation();
  const token = useSelector((state: RootState) => state.auth.token);
  const [search, setSearch] = useState(true);
  const [data, setData] = useState<RegisterServiceProps[]>([]);

  const handleReturn = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (search) {
      api
        .get("/servicos", {
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

  console.log(data)

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://s3-alpha-sig.figma.com/img/0a9b/ca71/2fd36a435de4cdae556e9f1744e5c802?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ChxBPURBr4jRTdXaNA7DagxtgSca45Rff63NNrKqtaz9ZQYuio85HmXeUgcipTBxWyRnkOsEn-ei0MBe~grN04RubnaZ80M1g7l6vg3zF7pMQd7QLnM2wXjxq4xJ45~lvCV~NtlIBr-P4qZ4ZSV3nf7nww79hjY-SCuyInK7qnuvL-ZsKAUU~zH7mYq14H9y-DGp0AD4OszAUt6NYWmSc6djmEB9GCAOJOFyvMxpIovaYZn03yK~IUmH29pYGRxmc5IqEQxOlxZxpmB3xWPDkc4zKPcnFByC0oydSvjuI4io0ou2pi4jJ7~sfDFPjxBLu3lIWpiDtwhFMzXPql-hOw__",
        }} // Replace with actual image URL
        style={styles.headerImage}
      >
        <LinearGradient
          colors={["rgba(47, 50, 67, 0.585)", "rgba(33, 35, 47, 0.765)"]}
          style={styles.gradient}
        />
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>ABERTO</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Salão corte certo</Text>
          <Text style={styles.location}>Porto Alegre • 5.2kms</Text>
        </View>
      </ImageBackground>
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="phone" size={16} color="#000" />
          <Text style={styles.actionText}>Ligar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="map-pin" size={16} color="#000" />
          <Text style={styles.actionText}>Visitar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share" size={16} color="#000" />
          <Text style={styles.actionText}>Compartilhar</Text>
        </TouchableOpacity>
        <View style={styles.bookButtonContainer}>
          <TouchableOpacity style={styles.bookButton}>
            <Icon
              name="clock"
              size={12}
              color="#fff"
              style={styles.bookButtonIcon}
            />
            <Text style={styles.bookButtonText}>AGENDAR AGORA</Text>
          </TouchableOpacity>
          <Text style={styles.availableTimesText}>Horários Disponíveis</Text>
        </View>
      </View>
      <View style={styles.servicesContainer}>
        <Text style={styles.servicesTitle}>Serviços</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquise um serviço..."
        />
      </View>
      <ScrollView style={{ height: "80%" }}>
        {data &&
          data.length > 0 &&
          data.map((value, index) => (
            <ServiceCard key={index} service={value} />
          ))}
      </ScrollView>
      <Modal transparent={true} visible={search} onRequestClose={() => {}}>
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
    justifyContent: "space-around",
    paddingHorizontal: 5,
    borderTopWidth: 1,
    borderBottomWidth: 8,
    borderColor: "#e0e0e0",
    alignItems: "center",
    height: 70,
  },
  actionButton: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: -20,
  },
  actionText: {
    marginTop: 5,
    fontSize: 10,
    color: "#000",
  },
  bookButtonContainer: {
    alignItems: "center",
    paddingRight: -50,
  },
  bookButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 137,
    height: 27,
    backgroundColor: "#06D6A0",
    borderRadius: 3,
    paddingHorizontal: 10,
  },
  bookButtonIcon: {
    marginRight: 5,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 9,
  },
  availableTimesText: {
    marginTop: 2,
    fontSize: 10,
    color: "#2F3243",
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
});

export default TelaInicial;
