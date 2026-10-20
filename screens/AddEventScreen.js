// Écran de formulaire : sert à créer un événement ET à modifier un événement existant
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useEvents } from "../EventsContext";
import { Calendar } from "react-native-calendars";

export default function AddEventScreen({ navigation, route }) {
	// Événement reçu depuis la liste si on a cliqué sur "Modifier" ; vide si on vient de "Ajouter"
	const eventToEdit = route.params?.event;
	const { addEvent, updateEvent } = useEvents();
	// Un état par champ du formulaire, pré-remplis quand on modifie un événement
	const [title, setTitle] = useState(eventToEdit ? eventToEdit.title : "");
	const [description, setDescription] = useState(
		eventToEdit ? eventToEdit.description : "",
	);
	const [date, setDate] = useState(eventToEdit ? eventToEdit.date : "");
	const [error, setError] = useState("");

	// Vérifie les champs obligatoires, construit l'événement, puis l'ajoute ou le met à jour
	const handleSave = () => {
		if (title === "" || date === "") {
			setError("Le titre et la date sont obligatoires");
			return;
		}
		setError("");

		const newEvent = {
			// En modifiant on garde le même ID d'origine, sinon on en crée un nouveau avec l'heure actuelle
			id: eventToEdit ? eventToEdit.id : Date.now().toString(),
			title,
			description,
			date,
			participated: eventToEdit ? eventToEdit.participated : false,
		};

		// Si on modifie, on appelle updateEvent ; sinon on appelle addEvent
		if (eventToEdit) {
			updateEvent(newEvent);
		} else {
			addEvent(newEvent);
		}
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<TextInput
				placeholder="Titre"
				value={title}
				onChangeText={setTitle}
				style={styles.input}
			/>
			<TextInput
				placeholder="Description"
				value={description}
				onChangeText={setDescription}
				style={styles.input}
			/>
			<Text>Date choisie : {date}</Text>
			{/* Calendrier : au clic sur un jour, la date choisie est rangée dans l'état date */}
			<Calendar
				onDayPress={(day) => setDate(day.dateString)}
				markedDates={{ [date]: { selected: true } }}
			/>

			{error !== "" && <Text style={styles.error}>{error}</Text>}

			<Button title="Enregistrer" onPress={handleSave} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20 },
	input: { flex: 1, padding: 10, marginBottom: 10 },
	error: { color: "red" },
});
