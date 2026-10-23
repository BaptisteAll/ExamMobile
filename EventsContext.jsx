// Panneau partagé qui garde la liste des événements pour tous les écrans
// et la sauvegarde dans AsyncStorage pour qu'elle survive au rechargement

import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EventsContext = createContext();

export function EventsProvider({ children }) {
	const [events, setEvents] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false); //S'assure que tout as bien été chargé

	// Au démarrage : lit la sauvegarde dans AsyncStorage, puis remet la liste dans l'appli
	useEffect(() => {
		const loadEvents = async () => {
			const saved = await AsyncStorage.getItem("events");
			if (saved !== null) {
				setEvents(JSON.parse(saved));
			}
			setIsLoaded(true);
		};
		loadEvents();
	}, []);

	//Sauvegarde la liste dans AsyncStorage à chaque changement, mais seulement une fois le chargement terminé
	useEffect(() => {
		if (isLoaded) {
			AsyncStorage.setItem("events", JSON.stringify(events));
		}
	}, [events, isLoaded]);

	//Ajout d'évènement
	const addEvent = (newEvent) => {
		setEvents([...events, newEvent]);
	};

	//Modification d'évènement
	const updateEvent = (updatedEvent) => {
		const updatedEvents = events.map((event) =>
			event.id === updatedEvent.id ? updatedEvent : event,
		);
		setEvents(updatedEvents);
	};

	return (
		<EventsContext.Provider
			value={{ events, setEvents, addEvent, updateEvent }}
		>
			{children}
		</EventsContext.Provider>
	);
}

//fonction utilisée par les écrans pour accéder à la liste et aux fonctions du panneau
export function useEvents() {
	return useContext(EventsContext);
}
