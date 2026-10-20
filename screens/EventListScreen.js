// Écran principal : affiche la liste des événements et permet d'ajouter un événement,
// de le modifier, de le supprimer ou de le marquer comme participé
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useEvents } from "../EventsContext";
import AppButton from "../components/AppButton";

export default function EventListScreen({ navigation }) {
	// Récupère la liste et la fonction pour la modifier depuis le panneau partagé
	const { events, setEvents } = useEvents();

	// Supprime l'événement dont l'id est donné, en gardant tous les autres
	const deleteEvent = (id) => {
		const remainingEvents = events.filter((event) => event.id !== id);
		setEvents(remainingEvents);
	};

	// Inverse "participé" pour l'événement dont l'id est donné
	const toggleParticipated = (id) => {
		const updatedEvents = events.map((event) =>
			event.id === id ? { ...event, participated: !event.participated } : event,
		);
		setEvents(updatedEvents);
	};

	return (
		<View style={styles.container}>
			{/* Boutons du haut : ajouter un événement et voir le calendrier */}
			<View style={styles.buttonRow}>
				<AppButton
					title="Ajouter un événement"
					onPress={() => navigation.navigate("AddScreen")}
				/>
				<AppButton
					title="Voir le calendrier"
					onPress={() => navigation.navigate("Calendar")}
				/>
			</View>

			{/* Affiche chaque événement de la liste dans une carte */}
			<FlatList
				data={events}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View style={styles.card}>
						<Text style={styles.title}>{item.title}</Text>
						<Text>{item.description}</Text>
						<Text>{item.date}</Text>

						{/* Bouton "Participé" : seul sur sa ligne, au-dessus des deux autres */}
						<View style={styles.participateWrapper}>
							<AppButton
								title={
									item.participated ? "Participé ✔" : "Marquer comme participé"
								}
								color={item.participated ? "#4CAF50" : "#2196F3"}
								onPress={() => toggleParticipated(item.id)}
							/>
						</View>

						{/* "Supprimer" et "Modifier" côte à côte */}
						<View style={styles.buttonRow}>
							<AppButton
								title="Supprimer"
								color="#D32F2F"
								onPress={() => deleteEvent(item.id)}
							/>
							{/* Bouton "Modifier" : ouvre le formulaire en lui envoyant l'événement */}
							<AppButton
								title="Modifier"
								onPress={() => navigation.navigate("AddScreen", { event: item })}
							/>
						</View>
					</View>
				)}
			/>
		</View>
	);
}

// Styles regroupés au même endroit (équivalent d'un fichier CSS)
const styles = StyleSheet.create({
	container: { flex: 1, padding: 20 },
	card: { padding: 15, marginBottom: 10, borderWidth: 1 },
	title: { fontWeight: "bold" },
	participateWrapper: { marginTop: 10, alignItems: "center" },
	buttonRow: { flexDirection: "row", gap: 5, marginVertical: 5, justifyContent: "center" },
});