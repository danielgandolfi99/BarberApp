import { ActivityIndicator, Modal, ScrollView, View } from "react-native";
import { styles } from "../../../components/stylesComponents";
import ButtonStyled from "../../../components/ButtonStyled";
import { Avatar, Card, Text } from "@rneui/base";
import Icon from "react-native-vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import BarberRegistrationCard from "../../../components/BarberRegistrationCard";
import BarberRegistrationModal from "../../../components/Modals/BarberRegistrationModal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/redux/store";
import api from "../../../services/api";
import { RegisterBarberProps } from "../../../types/barber";
import { stylesModal } from "../../login";

const CadastroBarbeiros = () => {
  const navigation = useNavigation();
  const token = useSelector((state: RootState) => state.auth.token);
  const [search, setSearch] = useState(true);
  const [data, setData] = useState<RegisterBarberProps[]>([]);

  const handleReturn = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (search) {
      api
        .get("/barbeiros", {
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

  const [visibleModal, setVisibleModal] = useState(false);

  console.log(token);

  return (
    <View style={{ backgroundColor: "#fff", flex: 1, alignItems: "center" }}>
      <Header
        title="Cadastro de Barbeiros"
        subtitle="Gerêncie os funcionários da barbearia"
        onNavegatePage={handleReturn}
      />
      <ScrollView style={{ height: "80%" }}>
        {data &&
          data.map((value, index) => (
            <BarberRegistrationCard
              key={index}
              barber={value}
              onSearch={setSearch}
            />
          ))}
      </ScrollView>
      <ButtonStyled name="Adicionar" onPress={() => setVisibleModal(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleModal}
        onRequestClose={() => setVisibleModal(false)}
      >
        <BarberRegistrationModal
          handleClose={() => setVisibleModal(false)}
          onSearch={setSearch}
        />
      </Modal>
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
export default CadastroBarbeiros;
