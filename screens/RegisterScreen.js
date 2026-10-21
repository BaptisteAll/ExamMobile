// Écran d'inscription : enregistre un nouveau compte (email + mot de passe) dans AsyncStorage

import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppButton from "../components/AppButton";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //vérifie les champs, contrôle le doublon, puis enregistre.
  const handleRegister = async () => {
    if (email === '' || password === '') {
      setError('Merci de remplir tous les champs');
      return;
    }

    // Lit la liste des comptes enregistrés (liste vide si personne ne s'est inscrit)
    const saved = await AsyncStorage.getItem('users');
    const users = saved !== null ? JSON.parse(saved) : [];

    // Vérifie si un compte existe déjà avec cet email
    const alreadyExists = users.some((user) => user.email === email);
    if (alreadyExists) {
      setError('Cet email est déjà utilisé');
      return;
    }

    // Ajoute le nouveau compte à la liste, puis la réécrit dans AsyncStorage
    users.push({ email, password });
    await AsyncStorage.setItem('users', JSON.stringify(users));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Créer un compte</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
      />
      {error !== '' && <Text style={{ color: 'red' }}>{error}</Text>}
      <AppButton title="S'inscrire" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', padding: 20 },
	card: { borderWidth: 1, padding: 10, marginVertical: 10 },
});