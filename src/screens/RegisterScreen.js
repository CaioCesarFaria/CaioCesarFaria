// RegisterScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { auth, db } from '../services/firebaseConfig'; // Certifique-se de que o caminho está correto
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function Registro({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    
    const handleRegister = async () => {
        if (!name || !email || !password || !phone) {
            // Verifica se todos os campos foram preenchidos
            Alert.alert('Erro', 'Por favor, preencha todos os campos!');
            return;
        }

        try {
            // Criando o usuário com email e senha no Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("Usuário cadastrado:", userCredential.user);
            navigation.navigate("Welcome");

            // Após a criação do usuário, vamos salvar os dados no Firestore
            await setDoc(doc(db, 'users', user.uid), {
                name: name,
                email: email,
                phone: phone,
            });


        } catch (error) {
            console.error('Erro ao registrar:', error.message);
            Alert.alert('Erro', 'Ocorreu um erro ao realizar o cadastro. Tente novamente!');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastrar</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Telefone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={15} // Limitar o número de caracteres para o formato de telefone
            />

            <Button title="Cadastrar" onPress={handleRegister} />

            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.link}>Já tem uma conta? Faça login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        borderRadius: 4,
    },
    link: {
        color: '#007BFF',
        textAlign: 'center',
        marginTop: 20,
    },
});

