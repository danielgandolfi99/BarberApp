import { Modal, ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Header from "../../components/Header";
import api from "../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../../services/redux/store";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "../../components/DatePicker";
import { Text } from "@rneui/base";
import ButtonStyled from "../../components/ButtonStyled";

const Relatorios = () => {
  const navigation = useNavigation();
  const token = useSelector((state: RootState) => state.auth.token);
  const [dt_ini, setDt_ini] = useState(new Date());
  const [dt_fim, setDt_fim] = useState(new Date());

  const handleReturn = () => {
    navigation.goBack();
  };

  function getData() {
    api.get(`/${1}/relatorio?dt_ini=${dt_ini}&dt_fim${dt_fim}&barbeiro=1&servico=2`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }


  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Header
        title="Relatórios"
        subtitle="Esculpindo estilos, criando obras-primas."
        onNavegatePage={handleReturn}
      />
      <View style={{ marginTop: 15, alignItems: "center" }}>
        <View style={styles.dateContainer}>
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Data inicial</Text>
            <DatePicker handleSelect={(a) => { setDt_ini(a) }} initialValue={new Date()} />
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Data final</Text>
            <DatePicker handleSelect={(a) => { setDt_fim(a) }} initialValue={new Date()} />
          </View>
        </View>
        <View style={styles.dateContainer}>
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Barbeiro</Text>
            <Picker style={{ backgroundColor: "#fff" }}>
              <Picker.Item label="Todos" value=' ' />
            </Picker>
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Serviço</Text>
            <Picker style={{ backgroundColor: "#fff" }}>
              <Picker.Item label="Todos" value=' ' />
            </Picker>
          </View>
        </View>
        <ButtonStyled name="Pesquisar" onPress={() => { }} />
      </View>
    </View>
  );
};
export default Relatorios;

const styles = StyleSheet.create({
  label: {
    color: '#fff',
    fontWeight: 700
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10
  },
  pickerContainer: {
    width: '48%'
  }
})