import { Modal, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Header from "../../components/Header";
import api from "../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../../services/redux/store";

const Relatorios = () => {
  const navigation = useNavigation();
  const token = useSelector((state: RootState) => state.auth.token);
  const [dt_ini, setDt_ini] = useState(new Date());
  const [dt_fim, setDt_fim] = useState(new Date());

  const handleReturn = () => {
    navigation.goBack();
  };

  function getData(){
    api.get(`/${1}/relatorio?dt_ini=${dt_ini}&dt_fim${dt_fim}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }


  return (
    <View style={{flex: 1, alignItems: "center" }}>
      <Header
        title="Relatórios"
        subtitle="Esculpindo estilos, criando obras-primas."
        onNavegatePage={handleReturn}
      />
      <View style={{marginTop: 15}}>
        
      </View>
    </View>
  );
};
export default Relatorios;
