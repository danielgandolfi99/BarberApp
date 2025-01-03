import { Button, Card } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { StyleSheet } from "react-native";

interface HeaderProps {
  onNavegatePage: () => void;
  title: string;
  subtitle: string;
  disabledReturn?: boolean;
}

export default function Header({
  onNavegatePage,
  title,
  subtitle,
  disabledReturn,
}: HeaderProps) {
  return (
    <View style={{ width: "100%", margin: 0 }}>
      <LinearGradient
        colors={["rgba(34,29,37,1)", "rgba(123,44,191,1)"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <Card containerStyle={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {!disabledReturn && (
              <Button onPress={onNavegatePage} color="transparent">
                <Icon
                  name="chevron-left"
                  color="#ffffff"
                  size={20}
                  style={styles.icon}
                />
              </Button>
            )}
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
          </View>
        </Card>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 100,
    width: "100%",
    justifyContent: "flex-end",
    paddingBottom: 15,
    backgroundColor: "transparent",
    margin: 0,
  },
  icon: {
    marginRight: 15,
    marginLeft: 0,
  },
  title: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 17,
    color: "#fff",
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: "Ubuntu_300Light",
    fontSize: 12,
    color: "#fff",
  },
});
