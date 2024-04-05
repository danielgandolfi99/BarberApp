import { Text, View } from "react-native";
import { styles } from "../stylesComponents";

export default function TextTitleStyled() {
    return (
        <View style={styles.row}>
        <Text style={styles.title}>BarberApp</Text>
      </View>
    )
}