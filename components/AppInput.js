// Champ de texte personnalisé : même style sombre pour tous les formulaires
import { TextInput, StyleSheet } from "react-native";
import { theme } from "../theme";

export default function AppInput(props) {
	return (
		<TextInput
			placeholderTextColor={theme.textMuted}
			{...props}
			style={[styles.input, props.style]}
		/>
	);
}

const styles = StyleSheet.create({
	input: {
		backgroundColor: theme.panel,
		color: theme.text,
		borderWidth: 1.5,
		borderColor: theme.accent,
		borderRadius: 10,
		padding: 12,
	},
});