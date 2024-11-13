import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen'
import Welcome from './src/screens/Welcome';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import InviteScreen from './src/screens/InviteScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen 
          name="Welcome" 
          component={Welcome} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name='RegisterScreen' component={RegisterScreen}/>
        <Stack.Screen name='LoginScreen' component={LoginScreen}/>
        <Stack.Screen name='HomeScreen' component={HomeScreen}/>
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="InviteScreen" component={InviteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
