import { Dimensions, Modal, ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMemo, useState } from "react";
import Header from "../../components/Header";
import api from "../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../../services/redux/store";
import DatePicker from "../../components/DatePicker";
import { Text } from "@rneui/base";
import ButtonStyled from "../../components/ButtonStyled";
import * as Print from 'expo-print';
import { format, subDays } from "date-fns";

interface RelatorioDataProps {
  atendimento_id: number,
  barbeiro_id: number,
  barbeiro: string,
  cliente_id: number,
  cliente: string,
  titulo: string,
  descricao: string,
  data_inicio: string,
  data_fim: string,
  finalizado: number
  valor: number
}

const Relatorios = () => {
  const navigation = useNavigation();
  const token = useSelector((state: RootState) => state.auth.token);
  const [dt_ini, setDt_ini] = useState(subDays(new Date(), 10));
  const [dt_fim, setDt_fim] = useState(new Date());
  const [dados, setDados] = useState<RelatorioDataProps[]>([])

  const handleReturn = () => {
    navigation.goBack();
  };

  function getData() {
    api.post<RelatorioDataProps[]>(`/atendimentos`,
      {
        barber_id: null,
        servicer_id: null,
        start_date: format(dt_ini, 'yyyy-MM-dd'),
        end_date: format(dt_fim, 'yyyy-MM-dd')
      }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => { setDados(res.data) }).catch(error => console.log(error))
  }




  const total = useMemo(() => {
    let t = 0;
    for (let i = 0; i < dados.length; i++) {
      t += Number(dados[i].valor);
    }
    return t
  }, [dados])


  async function geraPDF() {

    const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h2 style="font-size: 30px; font-family: Helvetica Neue; font-weight: normal;">
      Relatório de atendimentos ${format(dt_ini, 'dd/MM/yyyy')} à ${format(dt_fim, 'dd/MM/yyyy')}
    </h2>
    <table style="width: 100%; border-collapse: collapse; border: 1px solid black;">
  <thead>
    <tr>
      <th style="border: 1px solid black;">Barbeiro</th>
      <th style="border: 1px solid black;">Cliente</th>
      <th style="border: 1px solid black;">Serviço</th>
      <th style="border: 1px solid black;">Descrição</th>
      <th style="border: 1px solid black;">Início</th>
      <th style="border: 1px solid black;">Término</th>
      <th style="border: 1px solid black;">Valor</th>
    </tr>
  </thead>
  <tbody>
    ${dados.map(item => `
      <tr>
        <td style="border: 1px solid black;">${item.barbeiro}</td>
        <td style="border: 1px solid black;">${item.cliente}</td>
        <td style="border: 1px solid black;">${item.titulo}</td>
        <td style="border: 1px solid black;">${item.descricao}</td>
        <td style="border: 1px solid black;">${item.data_inicio}</td>
        <td style="border: 1px solid black;">${item.data_fim}</td>
        <td style="border: 1px solid black; white-space: nowrap;">${item.valor}</td>
      </tr>
    `).join('')}
  </tbody>
</table>

    <h3>Valor Total: R$${total.toFixed(2)}
      </body>
</html>
`;


    await Print.printAsync({
      html
    });
  }


  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "#fff" }}>
      <Header
        title="Relatórios"
        subtitle="Realize a consulta de histórico de atendimento."
        onNavegatePage={handleReturn}
      />
      <View style={{ marginTop: 15, alignItems: "center", width: "100%", padding: 10 }}>
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
        {/* <View style={styles.dateContainer}>
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
        </View> */}
        <ButtonStyled name="Pesquisar" onPress={getData} />
        <ButtonStyled name="Gerar PDF" onPress={geraPDF} />
        <ScrollView style={{ width: "100%", height: Dimensions.get('window').height / 1.77 }}>
          {dados.map(item => <><View style={{
            width: "100%",
            justifyContent: "space-between",
            marginBottom: 2,
            // borderBottomWidth: "1px",
            // borderBottomColor: "black"
          }}>
            <Text style={{ fontWeight: "bold" }}>{item.titulo}</Text>
            <Text>{item.descricao}</Text>
            <Text>Data: {item.data_inicio.substring(0, 10)} {item.data_inicio.substring(11, 16)} - {item.data_fim.substring(11, 16)}</Text>
            <Text>Barbeiro: {item.barbeiro}</Text>
            <Text>Cliente: {item.cliente}</Text>
            <Text style={{ textAlign: "right" }}>Valor: R${item.valor}</Text>
          </View>
            <View style={{ backgroundColor: "#d2d2d2", height: 2, width: "100%" }}></View></>)}
        </ScrollView>
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