import { View } from "react-native";
import { styles } from "../stylesComponents";
import { Button } from "@rneui/base";

interface ButtonProps {
    name: string;
    onPress: () => void;
}

export default function ButtonStyled({ name, onPress }: ButtonProps) {
    return (
        <View style={styles.row}>
            <Button
                title={name}
                color="#9D4EDD"
                titleStyle={{
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                    fontSize: 20,
                }}
                buttonStyle={styles.button}
                onPress={onPress}
            />
        </View>
    )
}