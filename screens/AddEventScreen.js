import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useEvents } from "../EventsContext";
import { Calendar } from 'react-native-calendars';

export default function AddEventScreen({ navigation, route }) {
	const eventToEdit = route.params?.event;
	const { addEvent, updateEvent } = useEvents();
	const [title, setTitle] = useState(eventToEdit ? eventToEdit.title : "");
	const [description, setDescription] = useState(
		eventToEdit ? eventToEdit.description : "",
	);
	const [date, setDate] = useState(eventToEdit ? eventToEdit.date : "");
	const [error, setError] = useState("");

	const handleSave = () => {
		if (title === "" || date === "") {
			setError("Le titre et la date sont obligatoires");
			return;
		}
		setError("");

		const newEvent = {
			id: eventToEdit ? eventToEdit.id : Date.now().toString(),
			title,
			description,
			date,
			participated: eventToEdit ? eventToEdit.participated : false,
		};

		if (eventToEdit) {
			updateEvent(newEvent);
		} else {
			addEvent(newEvent);
		}
		navigation.goBack();
	};

	return (
		<View style={{ flex: 1, padding: 20 }}>
			<TextInput
				placeholder="Titre"
				value={title}
				onChangeText={setTitle}
				style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
			/>
			<TextInput
				placeholder="Description"
				value={description}
				onChangeText={setDescription}
				style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
			/>
			<Text>Date choisie : {date}</Text>
<Calendar
  onDayPress={(day) => setDate(day.dateString)}
  markedDates={{ [date]: { selected: true } }}
/>

			{error !== "" && <Text style={{ color: "red" }}>{error}</Text>}

			<Button title="Enregistrer" onPress={handleSave} />
		</View>
	);
}
