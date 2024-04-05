import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { styles } from "../stylesComponents";

interface TextProps {
    textName: string;
    value: string;
    setValue: (value: string) => void;
    secureTextEntry?: boolean;
    placeholder?: string;
    autoCapitalizeNone?: boolean;
}

function TextInputStyled({ textName, value, setValue, secureTextEntry, placeholder, autoCapitalizeNone }: TextProps) {
    return (
        <View style={styles.row}>
            <Text style={styles.text}>{textName}</Text>
            <TextInput style={styles.input} value={value} onChangeText={setValue} secureTextEntry={secureTextEntry ? true : false}
                placeholder={placeholder}
                autoCapitalize={autoCapitalizeNone ? 'none' : "sentences"}
            />
        </View>
    )
}

export default TextInputStyled;