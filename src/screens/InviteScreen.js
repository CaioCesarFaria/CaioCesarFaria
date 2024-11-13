import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList, StyleSheet } from 'react-native';
import { db } from '../services/firebaseConfig';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export default function InviteScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventCode, setEventCode] = useState('');
  const [eventItems, setEventItems] = useState([]);

  const handleJoinEvent = async () => {
    if (!name || !phone || !eventCode) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const docRef = doc(db, 'events', eventCode);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setEventItems(docSnap.data().items);

        await updateDoc(docRef, {
          convidadosConfirmados: arrayUnion({ name, phone }),
        });
        
        Alert.alert('Sucesso', 'Você entrou no evento!');
      } else {
        Alert.alert('Erro', 'Código de evento inválido.');
      }
    } catch (error) {
      console.error('Erro ao entrar no evento:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Código do Evento"
        value={eventCode}
        onChangeText={setEventCode}
      />
      <Button title="Ver Lista de Itens" onPress={handleJoinEvent} />

      <FlatList
        data={eventItems}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text style={styles.itemText}>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 4,
  },
  itemText: {
    fontSize: 16,
    paddingVertical: 4,
  },
});
