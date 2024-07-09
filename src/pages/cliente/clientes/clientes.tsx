import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/redux/store";
import { Dimensions, Linking, ScrollView, View } from "react-native";
import Header from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { Text, StyleSheet } from "react-native";
import { Button, Icon } from "@rneui/base";
import { formatPhone } from "../../../utils/formatPhone";


interface ClienteProps {
    atendimentos: number,
    celular: string, cliente_id: number, email: string, nome: string, sobrenome: string, ult_atendimento: string, user_id: number
}

export default function MyClients(): JSX.Element {
    const navigation = useNavigation();
    const user = useSelector((state: RootState) => state.user);
    const token = useSelector((state: RootState) => state.auth.token);

    const [clientes, setClientes] = useState<ClienteProps[]>([])

    async function getClients() {
        api.get<ClienteProps[]>(`/barbeiros/${user.barbeiro_id}/clientes`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(res => {
            setClientes(res.data)
        }).catch((error) => { console.log(error) })
    }


    useEffect(() => {
        getClients()
    }, [])

    useEffect(() => {
        console.log(clientes.length)
    }, [clientes])

    const handleReturn = () => {
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor: "#fff" }}>
        <Header
            title="Meus clientes"
            subtitle="Os clientes que confiaram no seu serviço"
            onNavegatePage={handleReturn}
        />

        <View style={{ alignItems: "center", width: "100%", padding: 10 }}>
            {clientes.map((item, i) => {
            return (
                <View key={i} style={styles.card}>
                <Text style={styles.cardTitle}>
                    {item.nome} {item.sobrenome}
                </Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
                    <View>
                    <Text style={styles.cardText}><Text style={styles.boldText}>Telefone:</Text> {formatPhone({ phone: item.celular })}</Text>
                    <Text style={styles.cardText}><Text style={styles.boldText}>E-mail:</Text> {item.email}</Text>
                    <Text style={styles.cardText}>
                        <Text style={styles.boldText}>Serviços realizados:</Text> {item.atendimentos}
                    </Text>
                    <Text style={styles.cardText}>
                        <Text style={styles.boldText}>Data ult. Serviço:</Text> {item.ult_atendimento}
                    </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                    <Button containerStyle={{ width: 50 }} type="clear">
                        <Icon type="entypo" name="phone" color="#fff" onPress={() => { Linking.openURL(`tel:${item.celular}`); }} />
                    </Button>
                    <Button containerStyle={{ width: 50 }} type="clear">
                        <Icon type="fontisto" name="email" color="#fff" onPress={() => { Linking.openURL(`mailto:${item.email}`) }} />
                    </Button>
                    </View>
                </View>
                </View>
            );
            })}
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
  card: {
    width: '95%',
    height: 130,
    backgroundColor: "#9D4EDD",
    marginBottom: 10,
    color: "#fff",
    padding: 10,
  },
  cardTitle: {
    fontFamily: "Montserrat",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "left",
    color: "#fff",
    marginBottom: 5
  },
  cardText: {
    fontFamily: "Montserrat",
    fontSize: 14,
    textAlign: "left",
    color: "#fff",
    marginBottom: 2,
  },
  boldText: {
    fontFamily: "Montserrat",
    fontWeight: "700",
    color: "#fff",
  },
});