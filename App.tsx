import React, {useState} from 'react'
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native'
import { TextInputMask } from "react-native-masked-text";

function App() {
  const [enteredWeight, setEnteredWeight] = useState('')
  const [enteredHeight, setEnteredHeight] = useState('')
  const [imc, setImc] = useState(0.00)
  const [imcRating, setImcRating] = useState('')

  const changeSaldoHandler = () => {
    const height = parseFloat(enteredHeight)
    const weight = parseFloat(enteredWeight)
    if (isNaN(height) || isNaN(weight)) {
      Alert.alert('Erro', 'os valores precisam ser números válidos')
      return
    }
    const enteredImc = weight / (height * height)
    const finalImc = parseFloat(enteredImc.toFixed(1))
    if (finalImc < 18.5) {
      setImcRating('Peso abaixo do normal')
    } else if (finalImc < 25) {
      setImcRating('Peso normal')
    } else if (finalImc < 30) {
      setImcRating('Excesso de peso')
    } else if (finalImc < 35) {
      setImcRating('Obesidade grau I')
    } else if (finalImc < 40) {
      setImcRating('Obesidade grau II')
    } else {
      setImcRating('Obesidade grau III')
    }
    setImc(finalImc)
    setEnteredHeight('')
    setEnteredWeight('')
  }

  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  }

  const titleStyle = {
    color: isDarkMode ? 'white' : 'black',
  }

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text style={[titleStyle, styles.titulo]}>Calculadora IMC</Text>
      <View style={styles.cardContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Peso (kg)</Text>
          <TextInputMask
            keyboardAppearance={isDarkMode ? 'light' : 'dark'}
            keyboardType={'number-pad'}
            style={styles.input}
            value={enteredWeight}
            onChangeText={val => setEnteredWeight(val)}
            type={'money'}
            options={{
              precision: 0,
              separator: '',
              delimiter: '',
              unit: '',
              suffixUnit: ''
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Altura (m)</Text>
          <TextInputMask
            keyboardAppearance={isDarkMode ? 'light' : 'dark'}
            keyboardType={'number-pad'}
            style={styles.input}
            value={enteredHeight}
            onChangeText={val => setEnteredHeight(val)}
            type={'money'}
            options={{
              precision: 2,
              separator: '.',
              delimiter: '',
              unit: '',
              suffixUnit: ''
            }}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => changeSaldoHandler()}>
            <Text style={styles.buttonText}>Calcular IMC</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.saldo}>IMC: {imc}</Text>
        <Text style={styles.saldo}>{imcRating}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  titulo: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardContainer: {
    marginTop: 8,
    backgroundColor: '#2b1150',
    padding: 8,
    borderRadius: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  saldo: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center"
  },
  input: {
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 16,
    marginLeft: 16,
    // marginHorizontal: 48,
    flex: 1
  },
  inputLabel: {
    color: 'white'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    justifyContent: 'center',
    height: 40,
  },
  buttonText: {
    color: 'white',
  },
})

export default App;
