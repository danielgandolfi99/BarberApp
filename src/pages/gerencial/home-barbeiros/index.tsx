import { Modal, ScrollView, View } from "react-native";
import Header from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import HomeBarberButton from "../../../components/HomeBarberButton";

const HomeBarbeiros = () => {
  const navigation = useNavigation();

  const handleReturn = () => {
    navigation.goBack();
  };

  const [visibleModal, setVisibleModal] = useState(false)

  return (
    <View style={{flex: 1, alignItems: "center" }}>
      <Header
        title="Olá fulaninho"
        subtitle="Esculpindo estilos, criando obras-primas."
        onNavegatePage={handleReturn}
      />
      <View style={{marginTop: 15}}>
        <HomeBarberButton name={"Minha\nAgenda"} icon="calendar-alt" navigatePage="Cadastro Barbeiros"/>
        <HomeBarberButton name={"Meus\nServiços"} icon="cut" navigatePage="Cadastro Barbeiros"/>
        <HomeBarberButton name={"Histórico de\nAtendimento"} icon="file" navigatePage="Cadastro Barbeiros"/>
        <HomeBarberButton name={"Barbeiros"}icon="user-alt" navigatePage="Cadastro Barbeiros"/>
      </View>
    </View>
  );
};
export default HomeBarbeiros;
