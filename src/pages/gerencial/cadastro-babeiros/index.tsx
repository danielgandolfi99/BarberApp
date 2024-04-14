import { View } from "react-native";
import { styles } from "../../../components/stylesComponents";
import ButtonStyled from "../../../components/ButtonStyled";
import { Avatar, Card, Text } from "@rneui/base";
import Icon from "react-native-vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";

const CadastroBarbeiros = () => {
  const navigation = useNavigation();

  const handleReturn = () => {
    navigation.goBack();
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1, alignItems: "center" }}>
      <Header
        title="Cadastro de Barbeiros"
        subtitle="Gerêncie os funcionários da barbearia"
        onNavegatePage={handleReturn}
      />
      <View style={styles.row}>
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
                Nome do barbeiro
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
                    60
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
                    52
                  </Text>
                </View>
              </View>
            </View>
            <Icon
              name="deleteuser"
              color="#D62828"
              size={35}
              style={{ alignSelf: "flex-end" }}
            />
          </View>
        </Card>
      </View>
    </View>
  );
};
export default CadastroBarbeiros;
