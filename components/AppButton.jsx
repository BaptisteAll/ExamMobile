// Bouton personnalisé : remplace le Button natif, qui ne peut pas avoir de coins arrondis
import { Pressable, Text, StyleSheet } from "react-native";

// variant choisit la couleur : "primary" (bleu), "danger" (rouge) ou "success" (vert)
export default function AppButton({ title, onPress, variant = "primary" }) {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [
				styles.button,
				styles[variant],
				pressed && styles.pressed,
			]}
		>
			<Text style={styles.text}>{title}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	text: { color: "white", fontWeight: "600", textAlign: "center" },
	primary: { backgroundColor: "#2196F3" },
	danger: { backgroundColor: "#D32F2F" },
	success: { backgroundColor: "#4CAF50" },
	pressed: { opacity: 0.7 },
});