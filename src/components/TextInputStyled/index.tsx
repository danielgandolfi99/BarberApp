import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

interface TextProps {
  textName: string;
  value: string;
  setValue: (value: string) => void;
  secureTextEntry?: boolean;
  placeholder?: string;
  autoCapitalizeNone?: boolean;
  keyboardTypeNumeric?: boolean;
}

function TextInputStyled({
  textName,
  value,
  setValue,
  secureTextEntry,
  placeholder,
  autoCapitalizeNone,
  keyboardTypeNumeric
}: TextProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{textName}</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          secureTextEntry={secureTextEntry ? !showPassword : false}
          placeholder={placeholder}
          autoCapitalize={autoCapitalizeNone ? "none" : "sentences"}
          keyboardType={keyboardTypeNumeric ? 'numeric' : 'default'}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.icon}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
  },
  input: {
    width: 295,
    height: 40,
    borderRadius: 10,
    padding: 10,
    fontFamily: "Montserrat_500Medium",
    fontSize: 12,
    color: "#fff",
    backgroundColor: "#9D4EDD",
    shadowColor: "#7B2CBF",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 10,
    elevation: 4,
  },
  text: {
    fontFamily: "Montserrat_700Bold",
    color: "#fff",
    marginBottom: 5,
    fontSize: 12,
  },
  icon: {
    position: "absolute",
    right: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default TextInputStyled;
