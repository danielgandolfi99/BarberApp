import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "@rneui/base";
import { RegisterServiceProps } from "../../types/services";
import { useDispatch } from "react-redux";
import { setIdServico } from "../../services/redux/agendamento";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

export default function ServiceCard({
  service,
}: {
  service: RegisterServiceProps;
}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAgendamento = () => {
    if (service.servico_id) {
      dispatch(setIdServico(service.servico_id));
    }

    navigation.navigate({ name: "Agendamento" } as never);
  };

  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.serviceTitle}>{service.titulo}</Text>
          <Text style={styles.servicePrice}>{`R$ ${service.valor} • 1hr`}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleAgendamento}>
          <Icon
            name="clock"
            size={12}
            color="#fff"
            style={styles.bookButtonIcon}
          />
          <Text style={styles.buttonText}>AGENDAR</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 0,
    borderRadius: 8,
    marginBottom: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  cardImage: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  servicePrice: {
    fontSize: 14,
    color: "#666",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#06D6A0",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
  },
  bookButtonIcon: {
    marginRight: 5,
  },
});
