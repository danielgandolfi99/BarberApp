import { Modal, ScrollView, View } from "react-native";
import Header from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import HomeBarberButton from "../../../components/HomeBarberButton";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/redux/store";
import { clearToken } from "../../../services/redux/authSlice";

const HomeBarbeiros = () => {
  const navigation = useNavigation();
  const username = useSelector((state: RootState) => state.user.name);

  const handleReturn = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Header
        title={`Olá ${username}`}
        subtitle="Esculpindo estilos, criando obras-primas."
        onNavegatePage={handleReturn}
      />
      <View style={{ marginTop: 15 }}>
        <HomeBarberButton
          name={"Minha\nAgenda"}
          icon="calendar-alt"
          navigatePage="Minha Agenda"
        />
        <HomeBarberButton
          name={"Meus\nServiços"}
          icon="cut"
          navigatePage="Cadastro Servicos"
        />
        <HomeBarberButton
          name={"Histórico de\nAtendimento"}
          icon="file"
          navigatePage="Home Barbeiros"
        />
        <HomeBarberButton
          name={"Barbeiros"}
          icon="user-alt"
          navigatePage="Cadastro Barbeiros"
        />
      </View>
    </View>
  );
};
export default HomeBarbeiros;
