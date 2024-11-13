// HomeScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Linking, Card } from 'react-native';
import { auth, db } from '../services/firebaseConfig'; // Certifique-se de que o caminho está correto
import { doc, getDoc } from 'firebase/firestore';

export default function HomeScreen({ navigation }) {
    const [userName, setUserName] = useState('');
    const [event, setEvent] = useState(null);
    const handleInvite = () => {
        const eventCode = 'ID_DO_EVENTO'; // Substitua com o código gerado do evento
        const inviteLink = `https://seuapp.netlify.app?code=${eventCode}`;
        const whatsappURL = `https://wa.me/?text=${encodeURIComponent('Acesse a lista de presentes do evento aqui: ' + inviteLink)}`;

        Linking.openURL(whatsappURL)
            .catch((error) => console.error('Erro ao abrir WhatsApp:', error));
    };
    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;

            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    setUserName(userDoc.data().name);
                }
            }
        };

        const fetchEventData = async () => {
            const eventDoc = await getDoc(doc(db, 'events', 'eventId')); // Substitua 'eventId' com o ID real do evento
            if (eventDoc.exists()) {
                setEvent(eventDoc.data());
            }
        };

        fetchUserData();
        fetchEventData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Seja bem-vindo, {userName}!</Text>

            <TouchableOpacity style={styles.btnEvento} onPress={() => navigation.navigate('SettingsScreen')}>
                <Text style={styles.btnEventoTitle}> Configurar Evento</Text>
            </TouchableOpacity>

            {event && (
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{event.name}</Text>
                    <Text>Data: {event.date}</Text>
                    <Text>Participantes: {event.attendeesCount}</Text>
                    <Text>Itens marcados: {event.itemsMarkedCount}</Text>
                </View>
            )}
            <View style={styles.container}>
                <Button title="Enviar Convite" onPress={handleInvite} />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        marginTop: 20,
        padding: 16,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    btnEvento: {
        backgroundColor: '#25304e'
    },
    btnEventoTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 5,
        paddingHorizontal: 8,
    }
});
