import { Modal, ScrollView, View } from "react-native";
import { styles } from "../../../components/stylesComponents";
import ButtonStyled from "../../../components/ButtonStyled";
import { Avatar, Card, Text } from "@rneui/base";
import Icon from "react-native-vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import BarberRegistrationCard, {
  BarberRegistrationCardProps,
} from "../../../components/BarberRegistrationCard";
import BarberRegistrationModal from "../../../components/Modals/BarberRegistrationModal";
import { useState } from "react";

const testExample: BarberRegistrationCardProps[] = [
  { name: "Daniel", scheduled: 20, performed: 15 },
  { name: "Lucas", scheduled: 15, performed: 1 },
  { name: "Marcos", scheduled: 18, performed: 15 },
  { name: "Erick", scheduled: 20, performed: 18 },
  { name: "Alex", scheduled: 18, performed: 5 },
  { name: "Test", scheduled: 18, performed: 5 },
];

const CadastroBarbeiros = () => {
  const navigation = useNavigation();

  const handleReturn = () => {
    navigation.goBack();
  };

  const [visibleModal, setVisibleModal] = useState(false)

  return (
    <View style={{ backgroundColor: "#fff", flex: 1, alignItems: "center" }}>
      <Header
        title="Cadastro de Barbeiros"
        subtitle="Gerêncie os funcionários da barbearia"
        onNavegatePage={handleReturn}
      />
      <ScrollView style={{ height: "80%" }}>
        {testExample &&
          testExample.map((value) => (
            <BarberRegistrationCard
              name={value.name}
              scheduled={value.scheduled}
              performed={value.performed}
            />
          ))}
      </ScrollView>
      <ButtonStyled name="Adicionar" onPress={() => setVisibleModal(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleModal}
        onRequestClose={() => setVisibleModal(false)}
      >
        <BarberRegistrationModal handleClose={ () => setVisibleModal(false) }/>
      </Modal>
    </View>
  );
};
export default CadastroBarbeiros;
