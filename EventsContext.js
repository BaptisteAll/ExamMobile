import { createContext, useContext, useState } from 'react';

const EventsContext = createContext();

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([
    { id: '1', title: 'Conférence React', description: 'Introduction à React Native', date: '2026-11-05', participated: false },
    { id: '2', title: 'Atelier cuisine', description: 'Cuisine du monde en groupe', date: '2026-11-12', participated: false },
  ]);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <EventsContext.Provider value={{ events, setEvents, addEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventsContext);
}