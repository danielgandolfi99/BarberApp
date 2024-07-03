import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/redux/store";
import { Dimensions, Linking, ScrollView, View } from "react-native";
import Header from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
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
                    console.log(item)
                    return (
                        <>
                            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 5 }} key={i} >
                                <View style={{ flexDirection: "column" }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>Cliente: {item.nome} {item.sobrenome}</Text>
                                    <Text>Email: {item.email}</Text>
                                    <Text>Fone: {formatPhone({phone:item.celular})}</Text>
                                    <Text>Nº atendimentos: {item.atendimentos}</Text>
                                    <Text>Último atendimento{item.ult_atendimento}</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Button containerStyle={{ width: 50 }} type="clear"><Icon type="entypo" name="phone" onPress={() => { Linking.openURL(`tel:${item.celular}`); }} /></Button>
                                    <Button containerStyle={{ width: 50 }} type="clear"><Icon type="fontisto" name="email" onPress={() => { Linking.openURL(`mailto:${item.email}`) }} /></Button>
                                </View>
                            </View>
                            <View style={{ backgroundColor: "#d2d2d2", height: 2, width: "100%" }}></View></>
                    )

                }

                )
                }

            </View>
        </View >
    )
}