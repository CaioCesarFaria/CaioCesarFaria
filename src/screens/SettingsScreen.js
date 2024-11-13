import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { db } from '../services/firebaseConfig';
import { doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export default function SettingsScreen({ navigation }) {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [item, setItem] = useState('');
  const [itemList, setItemList] = useState([]);

  // Função para adicionar um item à lista
  const handleAddItem = () => {
    if (item.trim()) {
      setItemList([...itemList, item.trim()]);
      setItem('');  // Limpa o campo de entrada após adicionar
    } else {
      Alert.alert('Erro', 'Por favor, digite o nome de um item.');
    }
  };

  // Função para salvar o evento com a lista de itens no Firestore
  const handleSave = async () => {
    if (!eventName || !eventDate || itemList.length === 0) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos e adicione pelo menos um item.');
      return;
    }

    try {
      // Salvando o evento no Firestore
      await setDoc(doc(db, 'events', 'eventId'), {
        name: eventName,
        date: eventDate,
        items: itemList,
        attendeesCount: 0,
        itemsMarkedCount: 0,
      });

      Alert.alert('Sucesso', `Evento cadastrado! Código do evento: ${docRef.id}`);
      navigation.navigate('HomeScreen');  // Navega para a tela inicial
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurar Evento</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Evento"
        value={eventName}
        onChangeText={setEventName}
      />
      <TextInput
        style={styles.input}
        placeholder="Data do Evento"
        value={eventDate}
        onChangeText={setEventDate}
      />

      {/* Campo de entrada e botão para adicionar itens à lista */}
      <TextInput
        style={styles.input}
        placeholder="Adicionar Item"
        value={item}
        onChangeText={setItem}
      />
      <Button title="Adicionar Item" onPress={handleAddItem} />

      {/* Lista de itens adicionados */}
      <FlatList
        data={itemList}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.itemText}>- {item}</Text>
        )}
      />

      <Button title="Salvar Evento" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  itemText: {
    fontSize: 16,
    paddingVertical: 4,
  },
});

