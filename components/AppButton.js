// Bouton personnalisé : remplace le Button natif, qui ne peut pas avoir de coins arrondis
import { Pressable, Text, StyleSheet } from "react-native";

export default function AppButton({ title, onPress, color = "#2196F3" }) {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [
				styles.button,
				{ backgroundColor: color, opacity: pressed ? 0.7 : 1 },
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
		alignSelf: "flex-start",
	},
	text: { color: "white", fontWeight: "600", textAlign: "center" },
});