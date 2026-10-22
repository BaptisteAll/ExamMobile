// Point d'entrée : déclare les écrans de l'application (navigation) et partage les événements via EventsProvider
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import EventListScreen from "./screens/EventListScreen";
import AddEventScreen from "./screens/AddEventScreen";
import CalendarScreen from "./screens/CalendarScreen";
import { EventsProvider } from "./EventsContext";
import { theme } from "./theme";

const Stack = createNativeStackNavigator();

export default function App() {
	// Le panneau partagé entoure la navigation pour que tous les écrans accèdent aux événements
	return (
		<EventsProvider>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="Login"
					screenOptions={{
						headerStyle: { backgroundColor: theme.header },
						headerTintColor: theme.text,
						headerTitleStyle: { fontWeight: "bold" },
					}}
				>
					{/* Chaque écran a un name (pour y naviguer), un component (ce qu'il affiche) et un titre */}
					<Stack.Screen
						name="Login"
						component={LoginScreen}
						options={{ title: "Connexion" }}
					/>
					<Stack.Screen
						name="Register"
						component={RegisterScreen}
						options={{ title: "Inscription" }}
					/>
					<Stack.Screen
						name="EventList"
						component={EventListScreen}
						options={{ title: "Événements" }}
					/>
					<Stack.Screen
						name="AddScreen"
						component={AddEventScreen}
						options={{ title: "Événement" }}
					/>
					<Stack.Screen
						name="Calendar"
						component={CalendarScreen}
						options={{ title: "Calendrier" }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</EventsProvider>
	);
}