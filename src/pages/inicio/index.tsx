import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Linking,
  ActivityIndicator,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Feather";
import IconExit from "react-native-vector-icons/MaterialIcons";
import IconUserEdit from "react-native-vector-icons/FontAwesome5";
import { useState, useEffect } from "react";
import { RootState } from "../../services/redux/store";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import api from "../../services/api";
import { RegisterServiceProps } from "../../types/services";
import ServiceCard from "../../components/ServiceCard";
import { stylesModal } from "../login";
import moment from "moment";
import { BackHandler } from "react-native";
import { Button } from "@rneui/base";
import { clearToken } from "../../services/redux/authSlice";
import { useDispatch } from "react-redux";

const TelaInicial = () => {
  const navigation = useNavigation();
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  const [isSearching, setIsSearching] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<RegisterServiceProps[]>([]);
  const [filteredData, setFilteredData] = useState<RegisterServiceProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleLogout = () => {
    dispatch(clearToken());
    navigation.navigate({ name: "Login" } as never);
  };

  useEffect(() => {
    const checkBusinessStatus = () => {
      const openingTime = moment().set({ hour: 8, minute: 0, second: 0 });
      const closingTime = moment().set({ hour: 18, minute: 0, second: 0 });

      const today = moment();
      const isWeekday = today.isoWeekday() >= 1 && today.isoWeekday() <= 6; // segunda a sábado

      if (isWeekday && today.isBetween(openingTime, closingTime)) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkBusinessStatus();

    const interval = setInterval(checkBusinessStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    api
      .get("/servicos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response && response.data) {
          setData(response.data);
          setFilteredData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsSearching(false);
      });
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((service) =>
        service.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, data]);

  const openMaps = () => {
    const latitude = -29.20304;
    const longitude = -51.34898;
    const url = `http://maps.google.com/?q=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const openPhone = () => {
    const phoneNumber = "+5551999999999";
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url);
  };

  const openEdit = () => {
    navigation.navigate({ name: "Alterar Dados" } as never);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://s3-alpha-sig.figma.com/img/0a9b/ca71/2fd36a435de4cdae556e9f1744e5c802?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ChxBPURBr4jRTdXaNA7DagxtgSca45Rff63NNrKqtaz9ZQYuio85HmXeUgcipTBxWyRnkOsEn-ei0MBe~grN04RubnaZ80M1g7l6vg3zF7pMQd7QLnM2wXjxq4xJ45~lvCV~NtlIBr-P4qZ4ZSV3nf7nww79hjY-SCuyInK7qnuvL-ZsKAUU~zH7mYq14H9y-DGp0AD4OszAUt6NYWmSc6djmEB9GCAOJOFyvMxpIovaYZn03yK~IUmH29pYGRxmc5IqEQxOlxZxpmB3xWPDkc4zKPcnFByC0oydSvjuI4io0ou2pi4jJ7~sfDFPjxBLu3lIWpiDtwhFMzXPql-hOw__",
        }}
        style={styles.headerImage}
      >
        <LinearGradient
          colors={["rgba(47, 50, 67, 0.585)", "rgba(33, 35, 47, 0.765)"]}
          style={styles.gradient}
        />
        <View
          style={[
            styles.statusContainer,
            isOpen ? styles.openContainer : styles.closedContainer,
          ]}
        >
          <Text style={styles.statusText}>{isOpen ? "ABERTO" : "FECHADO"}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Salão corte certo</Text>
          <Text style={styles.location}>Farroupilha</Text>
        </View>
        <View
          style={{
            alignItems: "flex-end",
            justifyContent: "center",
            padding: 0,
          }}
        >
          <Button
            color="transparent"
            title="Sair"
            iconPosition="right"
            containerStyle={{
              borderColor: "#fff",
              borderWidth: 1,
              borderRadius: 5,
              padding: 0,
              position: "absolute",
              top: -120,
              right: 10,
            }}
            titleStyle={{
              color: "#fff",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
              fontSize: 14,
            }}
            icon={<IconExit name="logout" size={20} color="#fff" />}
            onPress={handleLogout}
          />
        </View>
      </ImageBackground>
      <View style={styles.actionButtonsContainer}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.actionButton} onPress={openPhone}>
            <Icon name="phone" size={16} color="#000" />
            <Text style={styles.actionText}>Ligar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={openMaps}>
            <Icon name="map-pin" size={16} color="#000" />
            <Text style={styles.actionText}>Visitar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={openEdit}>
            <IconUserEdit name="user-edit" size={16} color="#000" />
            <Text style={styles.actionText}>Editar Dados</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate({ name: "Meus Agendamentos" } as never);
            }}
          >
            <Icon
              name="clock"
              size={12}
              color="#fff"
              style={styles.bookButtonIcon}
            />
            <Text style={styles.buttonText}>Meus Agendamentos</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.servicesContainer}>
        <Text style={styles.servicesTitle}>Serviços</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquise um serviço..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>
      <ScrollView style={{ height: "80%" }}>
        {filteredData.length > 0 &&
          filteredData.map((value, index) => (
            <ServiceCard key={index} service={value} />
          ))}
      </ScrollView>
      <Modal transparent={true} visible={isSearching} onRequestClose={() => {}}>
        <View style={stylesModal.modalBackground}>
          <View style={stylesModal.activityIndicatorWrapper}>
            <ActivityIndicator animating={isSearching} size={50} />
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
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  openContainer: {
    backgroundColor: "#06D6A0",
  },
  closedContainer: {
    backgroundColor: "#ff1300",
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
  actionButtonExit: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderColor: "#fff",
    marginRight: 20,
  },
  actionButton: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 20,
  },
  actionTextExit: {
    marginTop: 5,
    fontSize: 12,
    color: "#fff",
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
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#06D6A0",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
  },
  bookButtonIcon: {
    marginRight: 5,
  },
});

export default TelaInicial;
