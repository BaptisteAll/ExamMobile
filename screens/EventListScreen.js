import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useEvents } from '../EventsContext';

export default function EventListScreen({ navigation }) {

  const { events, setEvents } = useEvents();
  const deleteEvent = (id) => {
  const remainingEvents = events.filter((event) => event.id !== id);
  setEvents(remainingEvents);
};
// Inverse "participé" pour l'événement dont l'id est donné
  const toggleParticipated = (id) => {
    const updatedEvents = events.map((event) =>
      event.id === id ? { ...event, participated: !event.participated } : event
    );
    setEvents(updatedEvents);
  };

  return (
		<View style={ styles.container }>
			<Button
				title="Ajouter un événement"
				onPress={() => navigation.navigate("AddScreen")}
			/>
			<FlatList
				data={events}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View style={ styles.card }>
						<Text style={ styles.title}>{item.title}</Text>
						<Text>{item.description}</Text>
						<Text>{item.date}</Text>
						<View>
							<Button
								title={
									item.participated ? "Participé ✔" : "Marquer comme participé"
								}
								onPress={() => toggleParticipated(item.id)}
							/>
						</View>
						<View style={ styles.deleteWrapper }>
							<Button title="Supprimer" onPress={() => deleteEvent(item.id)} />
						</View>
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: { padding: 15, marginBottom: 10, borderWidth: 1 },
  title: { fontWeight: 'bold' },
  deleteWrapper: { marginTop: 10 },
});