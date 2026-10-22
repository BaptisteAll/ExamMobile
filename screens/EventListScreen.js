// Écran principal : affiche la liste des événements et permet d'ajouter un événement,
// de le modifier, de le supprimer ou de le marquer comme participé
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	useWindowDimensions,
} from "react-native";
import { useEvents } from "../EventsContext";
import AppButton from "../components/AppButton";
import { theme } from "../theme";

export default function EventListScreen({ navigation }) {
	// Récupère la liste et la fonction pour la modifier depuis le panneau partagé
	const { events, setEvents } = useEvents();

	// Largeur de la fenêtre : elle change si on redimensionne le navigateur ou si on tourne le téléphone
	const { width } = useWindowDimensions();
	// 2 colonnes sur petit écran (téléphone), 3 sur grand écran (ordinateur)
	const numColumns = width < 600 ? 2 : 3;

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

			{/* Affiche les événements en grille : key force un nouveau rendu quand le nombre de colonnes change */}
			<FlatList
				key={numColumns}
				numColumns={numColumns}
				data={events}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					// La largeur dépend du nombre de colonnes, donc elle est calculée ici et pas dans le StyleSheet
					<View style={[styles.cell, { width: `${100 / numColumns}%` }]}>
						{/* Carte : bordure verte si l'événement est marqué comme participé */}
						<View style={[styles.card, item.participated && styles.cardDone]}>
							<Text style={styles.title}>{item.title}</Text>
							<Text style={styles.info}>{item.description}</Text>
							<Text style={styles.info}>{item.date}</Text>

							{/* Bouton "Participé" : seul sur sa ligne, au-dessus des deux autres */}
							<View style={styles.participateWrapper}>
								<AppButton
									title={
										item.participated ? "Participé ✔" : "Marquer comme participé"
									}
									variant={item.participated ? "success" : "primary"}
									onPress={() => toggleParticipated(item.id)}
								/>
							</View>

							{/* "Supprimer" et "Modifier" côte à côte */}
							<View style={styles.buttonRow}>
								<AppButton
									title="Supprimer"
									variant="danger"
									onPress={() => deleteEvent(item.id)}
								/>
								{/* Bouton "Modifier" : ouvre le formulaire en lui envoyant l'événement */}
								<AppButton
									title="Modifier"
									onPress={() =>
										navigation.navigate("AddScreen", { event: item })
									}
								/>
							</View>
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
	cell: { padding: 5 },
	card: {
		flex: 1,
		padding: 15,
		backgroundColor: theme.panel,
		borderWidth: 1.5,
		borderColor: theme.accent,
		borderRadius: 12,
	},
	cardDone: { borderColor: theme.success },
	title: {
		fontWeight: "bold",
		fontSize: 16,
		textAlign: "center",
		color: theme.accentLight,
	},
	info: { textAlign: "center", color: theme.textMuted },
	participateWrapper: { marginTop: 10, alignItems: "center" },
	buttonRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		gap: 5,
		marginVertical: 5,
	},
});