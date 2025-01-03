import { ScrollView, View } from "react-native";
import Header from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import HomeBarberButton from "../../../components/HomeBarberButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/redux/store";
import { BackHandler } from "react-native";

const HomeBarbeiros = () => {
  const navigation = useNavigation();
  const username = useSelector((state: RootState) => state.user.name);
  const barbeiroId = useSelector((state: RootState) => state.user.barbeiro_id);

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

  const handleReturn = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <Header
        title={`Olá ${username}`}
        subtitle="Esculpindo estilos, criando obras-primas."
        onNavegatePage={handleReturn}
        disabledReturn
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
          name={"Meus\nClientes"}
          icon="users"
          navigatePage="Meus Clientes"
        />
        <HomeBarberButton
          name={"Histórico de\nAtendimento"}
          icon="file"
          navigatePage="Relatorios"
        />
        {barbeiroId === 32 && (
          <HomeBarberButton
            name={"Barbeiros"}
            icon="user-alt"
            navigatePage="Cadastro Barbeiros"
          />
        )}
        <HomeBarberButton
          name={"Alterar Dados\nde Cadastro"}
          icon="user-edit"
          navigatePage="Alterar Dados Barbeiro"
        />
        <HomeBarberButton
          name={"Sair"}
          icon="logout"
          navigatePage="Login"
          logout
        />
      </View>
    </ScrollView>
  );
};
export default HomeBarbeiros;
