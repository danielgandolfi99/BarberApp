import { Button } from '@rneui/base'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const Login = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>BarberApp</Text>
      </View>
      {/* <View style={styles.img}>
        <Image source={require('./assets/icon.png')} />
      </View> */}
      <View style={styles.row}>
        <Text style={styles.text}>E-mail</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Senha</Text>
        <TextInput style={styles.input} />

      </View>
      <View>
        <Button
          title="Entrar"
          color="#9D4EDD"
          titleStyle={{
            fontFamily: 'Montserrat',
            fontWeight: 'bold',
            fontSize: 20
          }}
          buttonStyle={styles.button}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7B2CBF',
    shadowColor: '#21232F',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0,
    shadowRadius: 10,
    elevation: 4
  },
  row: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 15
  },
  input: {
    width: 295,
    height: 40,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#9D4EDD',
    shadowColor: '#7B2CBF',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0,
    shadowRadius: 10,
    elevation: 4

  },
  text: {
    fontFamily: 'Montserrat',
    color: '#fff',
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 12
  },
  button: {
    marginTop: 20,
    width: 201,
    height: 40,
    borderRadius: 10,
    padding: 1
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold'
  },
  img: {
    width: 350,
    height: 250
  }
})
export default Login
