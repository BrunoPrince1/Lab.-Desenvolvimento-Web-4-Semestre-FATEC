import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ScrollView 
} from 'react-native';

const App = () => {
  // ESTADOS (useState) 
  const [peso, setPeso] = useState('');           // peso em kg
  const [altura, setAltura] = useState('');       // altura em metros
  const [imc, setImc] = useState(null);           // valor do IMC
  const [classificacao, setClassificacao] = useState('');
  const [corClassificacao, setCorClassificacao] = useState('');

  //  FUNÇÃO DE CLASSIFICAÇÃO 
  const getClassificacaoIMC = (valorIMC) => {
    if (valorIMC < 18.5) {
      return { texto: 'Abaixo do Peso', cor: '#FFC107' };           // Laranja Claro
    } else if (valorIMC < 25) {
      return { texto: 'Peso Normal (Eutrofia)', cor: '#4CAF50' };   // Verde
    } else if (valorIMC < 30) {
      return { texto: 'Sobrepeso', cor: '#FF9800' };                // Amarelo
    } else if (valorIMC < 35) {
      return { texto: 'Obesidade Grau I', cor: '#FF5722' };         // Laranja
    } else if (valorIMC < 40) {
      return { texto: 'Obesidade Grau II (Severa)', cor: '#F44336' }; // Vermelho
    } else {
      return { texto: 'Obesidade Grau III (Mórbida)', cor: '#D32F2F' }; // Vermelho 2
    }
  };

  // CÁLCULO DO IMC
  const calcularIMC = () => {
    const pesoStr = peso.replace(',', '.');
    const alturaStr = altura.replace(',', '.');

    const pesoNum = parseFloat(pesoStr);
    const alturaNum = parseFloat(alturaStr);

    // Validação
    if (!pesoStr || !alturaStr || isNaN(pesoNum) || isNaN(alturaNum) || alturaNum <= 0) {
      Alert.alert(
        'Erro de Validação',
        'Por favor, insira valores numéricos válidos.\nAltura não pode ser zero ou negativa.'
      );
      return;
    }

    // Fórmula
    const imcCalculado = pesoNum / (alturaNum * alturaNum);
    const imcArredondado = imcCalculado.toFixed(2);

    setImc(imcArredondado);

    // Chama a função
    const { texto, cor } = getClassificacaoIMC(imcCalculado);
    setClassificacao(texto);
    setCorClassificacao(cor);
  };

  // LIMPAR
  const limparCampos = () => {
    setPeso('');
    setAltura('');
    setImc(null);
    setClassificacao('');
    setCorClassificacao('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Calculadora de IMC</Text>
      <Text style={styles.subtitulo}>Insira seu peso e altura</Text>

      {/* Campo Peso */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Peso (kg)</Text>
        <TextInput
          style={styles.input}
          value={peso}
          onChangeText={setPeso}
          keyboardType="numeric"
          placeholder="Ex: 70 ou 70,5"
          placeholderTextColor="#999"
        />
      </View>

      {/* Campo Altura */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Altura (m)</Text>
        <TextInput
          style={styles.input}
          value={altura}
          onChangeText={setAltura}
          keyboardType="numeric"
          placeholder="Ex: 1.75 ou 1,75"
          placeholderTextColor="#999"
        />
      </View>

      {/* Botão Calcular */}
      <TouchableOpacity style={styles.botaoCalcular} onPress={calcularIMC}>
        <Text style={styles.textoBotao}>Calcular IMC</Text>
      </TouchableOpacity>

      {/* Resultado */}
      {imc !== null && (
        <View style={styles.resultadoContainer}>
          <Text style={styles.textoIMC}>Seu IMC: {imc}</Text>
          <Text style={[styles.textoClassificacao, { color: corClassificacao }]}>
            {classificacao}
          </Text>
        </View>
      )}

      {/* Botão Limpar */}
      <TouchableOpacity style={styles.botaoLimpar} onPress={limparCampos}>
        <Text style={styles.textoBotaoLimpar}>Limpar Campos</Text>
      </TouchableOpacity>

      <Text style={styles.rodape}>
        Baseado na tabela da OMS (Adultos ≥ 18 anos)
      </Text>
    </ScrollView>
  );
};

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 18,
  },
  botaoCalcular: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultadoContainer: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  textoIMC: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  textoClassificacao: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  botaoLimpar: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  textoBotaoLimpar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rodape: {
    marginTop: 30,
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default App;