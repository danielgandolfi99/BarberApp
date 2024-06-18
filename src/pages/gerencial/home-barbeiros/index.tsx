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

  const handleReturn = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Header
        title="Olá fulaninho"
        subtitle="Esculpindo estilos, criando obras-primas."
        onNavegatePage={handleReturn}
      />
      <View style={{ marginTop: 15 }}>
        <HomeBarberButton
          name={"Minha\nAgenda"}
          icon="calendar-alt"
          navigatePage="Home Barbeiros"
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
        <HomeBarberButton
          name={"Tela Inicial"}
          icon=""
          navigatePage="Tela Inicial"
        />
      </View>
    </View>
  );
};
export default HomeBarbeiros;
