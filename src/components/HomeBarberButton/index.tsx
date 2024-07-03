import { useNavigation } from "@react-navigation/native";
import { Card } from "@rneui/base";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconLogout from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { clearToken } from "../../services/redux/authSlice";

export interface BarberRegistrationCardProps {
  name: string;
  icon: string;
  navigatePage: string;
  logout?: boolean;
}

export default function BarberRegistrationCard({
  name,
  icon,
  navigatePage,
  logout,
}: BarberRegistrationCardProps) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleOpenPage = () => {
    navigation.navigate({ name: navigatePage } as never);
  };

  const handleLogout = () => {
    dispatch(clearToken());
    navigation.navigate({ name: "Login" } as never);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={logout ? handleLogout : handleOpenPage}
    >
      <Card containerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.text}>{name}</Text>
          {logout ? (
            <IconLogout name={icon} color="#ffffff" size={40} />
          ) : (
            <Icon name={icon} color="#ffffff" size={40} />
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: "90%",
    borderRadius: 10,
    borderColor: "#9D4EDD",
    backgroundColor: "#9D4EDD",
    borderWidth: 0,
    marginBottom: 2,
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
  },
});
