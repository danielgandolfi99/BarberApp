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
import { Provider } from "react-redux";
import store from "./src/services/redux/store";
import HomeBarbeiros from "./src/pages/gerencial/home-barbeiros";
import RecuperarSenha from "./src/pages/recuperar-senha";
import CadastroServicos from "./src/pages/gerencial/cadastro-servicos";
import TelaInicial from "./src/pages/inicio";
import Relatorios from "./src/pages/relatorios";
import Agendamento from "./src/pages/agendamento";
import AgendaCliente from "./src/pages/cliente/agendamentos";
import Agenda from "./src/pages/gerencial/agenda";
import AlterarDadosCliente from "./src/pages/cliente/alterar-dados";
import AlterarDadosBarbeiro from "./src/pages/gerencial/alterar-dados";
import MyClients from "./src/pages/cliente/clientes/clientes";

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
      <Provider store={store}>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="Meus Clientes" component={MyClients} />
            <Stack.Screen
              name="Cadastro Barbeiros"
              component={CadastroBarbeiros}
            />
            <Stack.Screen name="Home Barbeiros" component={HomeBarbeiros} />
            <Stack.Screen name="Recuperar Senha" component={RecuperarSenha} />
            <Stack.Screen
              name="Cadastro Servicos"
              component={CadastroServicos}
            />
            <Stack.Screen name="Tela Inicial" component={TelaInicial} />
            <Stack.Screen name="Relatorios" component={Relatorios} />
            <Stack.Screen name="Agendamento" component={Agendamento} />
            <Stack.Screen name="Meus Agendamentos" component={AgendaCliente} />
            <Stack.Screen name="Minha Agenda" component={Agenda} />
            <Stack.Screen name="Alterar Dados" component={AlterarDadosCliente} />
            <Stack.Screen name="Alterar Dados Barbeiro" component={AlterarDadosBarbeiro} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </LinearGradient>
  );
}
