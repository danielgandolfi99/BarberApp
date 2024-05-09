import { useNavigation } from "@react-navigation/native";
import { Card } from "@rneui/base";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";

export interface BarberRegistrationCardProps {
  name: string;
  icon: string;
  navigatePage: string;
}

export default function BarberRegistrationCard({
  name,
  icon,
  navigatePage,
}: BarberRegistrationCardProps) {
  const navigation = useNavigation();

  const handleOpenPage = () => {
    navigation.navigate({ name: navigatePage } as never);
  };

  return (
    <TouchableOpacity activeOpacity={0.75} onPress={handleOpenPage}>
      <Card containerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.text}>
            {name}
          </Text>
          <Icon
            name={icon}
            color="#ffffff"
            size={40}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 309,
    borderRadius: 10,
    borderColor: "#9D4EDD",
    backgroundColor: "#9D4EDD",
    borderWidth: 0,
    marginBottom: 2
  },
  text: {
    fontFamily: "Montserrat_700Bold", 
    fontSize: 16,
    color: "#fff",
    textAlign: "left",
    flex: 1, 
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  }
});
