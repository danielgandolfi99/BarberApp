import { createStackNavigator } from '@react-navigation/stack'
import Login from './src/pages/login'
import { DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import Cadastro from './src/pages/cadastro';
import { LinearGradient } from 'expo-linear-gradient';

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent'
  }
};

export default function App() {
  return (
    <LinearGradient
      colors={['rgba(123,44,191,1)', 'rgba(34,29,37,1)']} style={{ flex: 1 }}
    >
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
        </Stack.Navigator>
      </NavigationContainer>
    </LinearGradient>
  )
}
