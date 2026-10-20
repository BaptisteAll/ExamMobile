import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (email === '' || password === '') {
      setError('Merci de remplir tous les champs');
      return;
    }

    const saved = await AsyncStorage.getItem('users');
    const users = saved !== null ? JSON.parse(saved) : [];

    const alreadyExists = users.some((user) => user.email === email);
    if (alreadyExists) {
      setError('Cet email est déjà utilisé');
      return;
    }

    users.push({ email, password });
    await AsyncStorage.setItem('users', JSON.stringify(users));
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text>Créer un compte</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      {error !== '' && <Text style={{ color: 'red' }}>{error}</Text>}
      <Button title="S'inscrire" onPress={handleRegister} />
    </View>
  );
}