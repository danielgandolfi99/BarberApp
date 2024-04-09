import { Text, View } from "react-native";
import { styles } from "../stylesComponents";

export default function TextSubtitleStyled() {
  return (
    <View style={styles.row}>
      <Text style={styles.subtitle}>Cadastro</Text>
    </View>
  );
}
