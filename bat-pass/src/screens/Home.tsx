import React, { useState } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Clipboard, 
  Alert,
  Switch,
  ScrollView 
} from 'react-native';

export default function Home() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState('12');
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [batmanMode, setBatmanMode] = useState(true);

  const batmanChars = 'BATMAN';
  const gothamWords = ['BAT', 'CAVE', 'WAYNE', 'GOTHAM', 'JOKER', 'ROBIN'];
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';

  const generatePassword = () => {
    let charset = '';
    let generatedPassword = '';
    
    if (batmanMode) {
      // Batman-themed password generation
      const wordCount = Math.floor(parseInt(length) / 4);
      for (let i = 0; i < wordCount; i++) {
        generatedPassword += gothamWords[Math.floor(Math.random() * gothamWords.length)];
      }
      
      // Fill remaining length with Batman chars and numbers
      const remaining = parseInt(length) - generatedPassword.length;
      for (let i = 0; i < remaining; i++) {
        if (includeNumbers && Math.random() > 0.7) {
          generatedPassword += numbers[Math.floor(Math.random() * numbers.length)];
        } else {
          generatedPassword += batmanChars[Math.floor(Math.random() * batmanChars.length)];
        }
      }
    } else {
      // Standard password generation
      if (includeUppercase) charset += uppercase;
      if (includeLowercase) charset += lowercase;
      if (includeNumbers) charset += numbers;
      if (includeSymbols) charset += symbols;
      
      if (charset === '') {
        Alert.alert('Erro', 'Selecione pelo menos uma opção de caracteres!');
        return;
      }
      
      for (let i = 0; i < parseInt(length); i++) {
        generatedPassword += charset[Math.floor(Math.random() * charset.length)];
      }
    }
    
    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    if (password) {
      Clipboard.setString(password);
      Alert.alert('✅ Copiado!', 'Senha copiada para a área de transferência');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🦇 BAT PASS</Text>
        <Text style={styles.subtitle}>Sequenciador de Senhas do Batman</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Senha Gerada:</Text>
        <View style={styles.passwordContainer}>
          <Text style={styles.password}>{password || 'Gere uma senha...'}</Text>
          <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
            <Text style={styles.copyButtonText}>📋</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Configurações:</Text>
        
        <View style={styles.option}>
          <Text style={styles.optionLabel}>Comprimento:</Text>
          <TextInput
            style={styles.input}
            value={length}
            onChangeText={setLength}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>

        <View style={styles.option}>
          <Text style={styles.optionLabel}>🦇 Modo Batman</Text>
          <Switch
            value={batmanMode}
            onValueChange={setBatmanMode}
            thumbColor={batmanMode ? '#FFD700' : '#666'}
            trackColor={{ false: '#333', true: '#555' }}
          />
        </View>

        {!batmanMode && (
          <>
            <View style={styles.option}>
              <Text style={styles.optionLabel}>Maiúsculas (A-Z)</Text>
              <Switch
                value={includeUppercase}
                onValueChange={setIncludeUppercase}
                thumbColor={includeUppercase ? '#FFD700' : '#666'}
                trackColor={{ false: '#333', true: '#555' }}
              />
            </View>

            <View style={styles.option}>
              <Text style={styles.optionLabel}>Minúsculas (a-z)</Text>
              <Switch
                value={includeLowercase}
                onValueChange={setIncludeLowercase}
                thumbColor={includeLowercase ? '#FFD700' : '#666'}
                trackColor={{ false: '#333', true: '#555' }}
              />
            </View>
          </>
        )}

        <View style={styles.option}>
          <Text style={styles.optionLabel}>Números (0-9)</Text>
          <Switch
            value={includeNumbers}
            onValueChange={setIncludeNumbers}
            thumbColor={includeNumbers ? '#FFD700' : '#666'}
            trackColor={{ false: '#333', true: '#555' }}
          />
        </View>

        {!batmanMode && (
          <View style={styles.option}>
            <Text style={styles.optionLabel}>Símbolos (!@#$...)</Text>
            <Switch
              value={includeSymbols}
              onValueChange={setIncludeSymbols}
              thumbColor={includeSymbols ? '#FFD700' : '#666'}
              trackColor={{ false: '#333', true: '#555' }}
            />
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.generateButton} onPress={generatePassword}>
        <Text style={styles.generateButtonText}>🦇 GERAR SENHA</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {batmanMode ? '🌃 Protegido por Gotham City' : '🔒 Segurança Máxima'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 5,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  password: {
    flex: 1,
    fontSize: 16,
    color: '#FFD700',
    fontFamily: 'monospace',
  },
  copyButton: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    padding: 10,
    marginLeft: 10,
  },
  copyButtonText: {
    fontSize: 18,
    color: '#000',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionLabel: {
    fontSize: 16,
    color: '#ccc',
    flex: 1,
  },
  input: {
    backgroundColor: '#000',
    color: '#FFD700',
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 8,
    padding: 10,
    width: 60,
    textAlign: 'center',
    fontSize: 16,
  },
  generateButton: {
    backgroundColor: '#FFD700',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  generateButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});