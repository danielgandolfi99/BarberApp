import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/pages/login";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import Cadastro from "./src/pages/cadastro";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import {
  Ubuntu_300Light,
  Ubuntu_400Regular,
  Ubuntu_500Medium,
  Ubuntu_700Bold,
} from "@expo-google-fonts/ubuntu";
import CadastroBarbeiros from "./src/pages/gerencial/cadastro-babeiros";

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_500Medium,
    Ubuntu_300Light,
    Ubuntu_400Regular,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={["rgba(123,44,191,1)", "rgba(34,29,37,1)"]}
      style={{ flex: 1 }}
    >
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen
            name="Cadastro Barbeiros"
            component={CadastroBarbeiros}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LinearGradient>
  );
}
