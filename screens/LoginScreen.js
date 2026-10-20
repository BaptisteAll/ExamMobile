// Écran de connexion : compare l'email et le mot de passe saisis aux comptes enregistrés,
// puis ouvre la liste des événements si un compte correspond

// Un état par champ du formulaire, plus un pour le message d'erreur
import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	// Vérifie les champs, cherche un compte correspondant, puis connecte ou affiche une erreur
	const handleLogin = async () => {
		if (email === "" || password === "") {
			setError("Merci de remplir tous les champs");
			return;
		}

		// Lit la liste des comptes enregistrés (liste vide si personne ne s'est inscrit)
		const saved = await AsyncStorage.getItem("users");
		const users = saved !== null ? JSON.parse(saved) : [];

		// found vaut true si au moins un compte a le même email ET le même mot de passe que ceux saisis
		const found = users.some(
			(user) => user.email === email && user.password === password,
		);

		// Si un compte correspond, on ouvre la liste des événements ; sinon, on affiche une erreur
		if (found) {
			setError("");
			navigation.replace("EventList");
		} else {
			setError("Email ou mot de passe incorrect");
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
			<Button
				title="Créer un compte"
				onPress={() => navigation.navigate("Register")}
			/>
		</View>
	);
}
