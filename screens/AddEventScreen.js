import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useEvents } from "../EventsContext";

export default function AddEventScreen({ navigation }) {
	const { addEvent } = useEvents();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [error, setError] = useState("");

	const handleSave = () => {
		if (title === "" || date === "") {
			setError("Le titre et la date sont obligatoires");
			return;
		}
		setError("");

		const newEvent = {
      id: Date.now().toString(),
      title,
      description,
      date,
      participated: false,
    };
    addEvent(newEvent);
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
			<TextInput
				placeholder="Date (AAAA-MM-JJ)"
				value={date}
				onChangeText={setDate}
				style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
			/>

			{error !== "" && <Text style={{ color: "red" }}>{error}</Text>}

			<Button title="Enregistrer" onPress={handleSave} />
		</View>
	);
}
