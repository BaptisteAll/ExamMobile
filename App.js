//Centralisation des différentes routes

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import EventListScreen from "./screens/EventListScreen";
import AddEventScreen from "./screens/AddEventScreen";
import { EventsProvider } from "./EventsContext";
import RegisterScreen from './screens/RegisterScreen';
import CalendarScreen from "./screens/CalendarScreen";


const Stack = createNativeStackNavigator();


export default function App() {
	// Le panneau partagé entoure la navigation pour que tous les écrans accèdent aux événements
	return (
		<EventsProvider>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Login">
					{/* Chaque écran a un name (pour y naviguer) et un component (ce qu'il affiche) */}
					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen name="Register" component={RegisterScreen} />
					<Stack.Screen name="AddScreen" component={AddEventScreen} />
					<Stack.Screen name="EventList" component={EventListScreen} />
					<Stack.Screen name="Calendar" component={CalendarScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</EventsProvider>
	);
}
