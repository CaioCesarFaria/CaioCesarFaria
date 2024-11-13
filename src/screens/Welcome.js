import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-web';

export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
    <Image source={require('../../assets/logo.svg')}
     style={styles.logoWelcome}
    />
      <Text style={styles.title}>Bem-vindo ao FESTOU!</Text>
      <Text style={styles.subtitle}>
        Organize suas listas de presentes para qualquer evento, de forma simples e prática.
      </Text>
      <TouchableOpacity 
        style={styles.buttonRegistro} 
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.buttonLogin} 
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.buttonParticipar} 
        onPress={() => navigation.navigate('InviteScreen')}
      >
        <Text style={styles.buttonText}>Participar de Evento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoWelcome: {
    width:300,  // Ajuste o tamanho conforme necessário
     
    marginBottom: 20,  // Espaço abaixo da logo
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e94581',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#e94581',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  buttonRegistro: {
    width: '40%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#3dbcd3',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonLogin: {
    width: '40%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#3dbcd3',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonParticipar: {
    width: '40%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#3dbcd3',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

