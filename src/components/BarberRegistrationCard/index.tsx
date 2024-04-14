import { Avatar, Button, Card } from "@rneui/base";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useState } from "react";
import { Dialog } from "@rneui/themed";

export interface BarberRegistrationCardProps {
  name: string;
  scheduled: number;
  performed: number;
  //   image: string;
}

export default function BarberRegistrationCard({
  name,
  scheduled,
  performed,
}: BarberRegistrationCardProps) {
  const [deleteRegister, setDeleteRegister] = useState(false);

  const handleDeleteRegister = () => {
    closeDeleteRegister();
  };

  const closeDeleteRegister = () => {
    setDeleteRegister(false);
  };

  return (
    <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
      <Card
        containerStyle={{
          height: 100,
          width: 335,
          justifyContent: "center",
          borderRadius: 3,
          padding: 8,
          backgroundColor: "#9D4EDD",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Avatar
            size={80}
            rounded
            containerStyle={{ backgroundColor: "#D9D9D9" }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontFamily: "Montserrat_700Bold", fontSize: 16 }}>
              {name}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={{ flexDirection: "column", marginEnd: 15 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Montserrat_700Bold",
                    fontSize: 12,
                  }}
                >
                  Agendados
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Montserrat_700Bold",
                    fontSize: 16,
                  }}
                >
                  {scheduled}
                </Text>
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Montserrat_700Bold",
                    fontSize: 12,
                  }}
                >
                  Realizados
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Montserrat_700Bold",
                    fontSize: 16,
                  }}
                >
                  {performed}
                </Text>
              </View>
            </View>
          </View>
          <Button
            color="transparent"
            containerStyle={{ alignSelf: "flex-end" }}
            buttonStyle={{ padding: 0 }}
            onPress={() => setDeleteRegister(true)}
          >
            <Icon name="deleteuser" color="#D62828" size={35} />
          </Button>
        </View>
      </Card>
      <Dialog
        isVisible={deleteRegister}
        onBackdropPress={closeDeleteRegister}
        style={{ backgroundColor: "#fff" }}
      >
        <Dialog.Title title="Excluir Barbeiro" />
        <Text>Voce deseja excluir o barbeiro {name}?</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            alignItems: "flex-end",
          }}
        >
          <Button
            color="transparent"
            title="Cancelar"
            titleStyle={{ color: "red" }}
            onPress={closeDeleteRegister}
            buttonStyle={{ padding: 0 }}
          />
          <Button
            color="transparent"
            title="Confirmar"
            titleStyle={{ color: "green" }}
            onPress={handleDeleteRegister}
            buttonStyle={{ padding: 0 }}
          />
        </View>
      </Dialog>
    </View>
  );
}
