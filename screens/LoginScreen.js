// Écran de connexion : compare l'email et le mot de passe saisis aux comptes enregistrés,
// puis ouvre la liste des événements si un compte correspond
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";

export default function LoginScreen({ navigation }) {
	// Un état par champ du formulaire, plus un pour le message d'erreur
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
		<View style={styles.container}>
			<Text style={styles.title}>Connexion</Text>

			<AppInput
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				style={styles.input}
			/>

			<AppInput
				placeholder="Mot de passe"
				value={password}
				onChangeText={setPassword}
				secureTextEntry={true}
				style={styles.input}
			/>

			{error !== "" && <Text style={styles.error}>{error}</Text>}

			{/* Boutons côte à côte : se connecter ou créer un compte */}
			<View style={styles.buttonRow}>
				<AppButton title="Se connecter" onPress={handleLogin} />
				<AppButton
					title="Créer un compte"
					onPress={() => navigation.navigate("Register")}
				/>
			</View>
		</View>
	);
}

// Styles regroupés au même endroit (équivalent d'un fichier CSS)
const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", padding: 20 },
	title: { fontWeight: "bold", fontSize: 20, marginBottom: 10 },
	input: { borderWidth: 1, padding: 10, marginVertical: 10 },
	error: { color: "red" },
	buttonRow: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 5,
		marginVertical: 5,
	},
});