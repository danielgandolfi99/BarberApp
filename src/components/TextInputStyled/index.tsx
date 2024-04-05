import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { styles } from "../stylesComponents";

interface TextProps {
    textName: string;
    value: string;
    setValue: (value: string) => void;
}

function TextInputStyled({ textName, value, setValue }: TextProps) {
    return (
        <View style={styles.row}>
            <Text style={styles.text}>{textName}</Text>
            <TextInput style={styles.input} value={value} onChangeText={setValue} />
        </View>
    )
}

export default TextInputStyled;