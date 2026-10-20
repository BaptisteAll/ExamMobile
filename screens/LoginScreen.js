import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("12345678");
	const [error, setError] = useState("");

	const handleLogin = async () => {
  if (email === '' || password === '') {
    setError('Merci de remplir tous les champs');
    return;
  }

  const saved = await AsyncStorage.getItem('users');
  const users = saved !== null ? JSON.parse(saved) : [];

  const found = users.some(
    (user) => user.email === email && user.password === password
  );

  if (found) {
    setError('');
    navigation.replace('EventList');
  } else {
    setError('Email ou mot de passe incorrect');
  }
};

	return (
		<View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
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

			{error !== "" && <Text style={{ color: "red" }}>{error}</Text>}

			<Button title="Se connecter" onPress={handleLogin} />
			<Button title="Créer un compte" onPress={() => navigation.navigate('Register')} />
		</View>
	);
}
