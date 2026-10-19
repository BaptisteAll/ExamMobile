import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('12345678');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Si un des deux champs est vide, on affiche une erreur et on s'arrête
    if (email === '' || password === '') {
      setError('Merci de remplir tous les champs');
      return;
    }
    setError('');
    navigation.replace('EventList');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text>Connexion</Text>

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

      <Button title="Se connecter" onPress={handleLogin} />
    </View>
  );
}