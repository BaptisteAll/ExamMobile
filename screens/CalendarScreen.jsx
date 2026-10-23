// Écran calendrier : affiche un point sous chaque jour qui a au moins un événement
import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { useEvents } from "../EventsContext";
import { calendarTheme } from "../theme";

export default function CalendarScreen() {
	const { events } = useEvents();

	// Construit l'objet des jours à marquer : { '2026-11-05': { marked: true }, ... }
	const markedDates = {};
	events.forEach((event) => {
		markedDates[event.date] = { marked: true };
	});

	return (
		<View style={styles.container}>
			<Calendar theme={calendarTheme} markedDates={markedDates} />
		</View>
	);
}

// Styles regroupés au même endroit (équivalent d'un fichier CSS)
const styles = StyleSheet.create({
	container: { flex: 1, padding: 20 },
});