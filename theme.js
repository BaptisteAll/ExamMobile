// Palette de couleurs de l'application (thème jeu vidéo) : on change les couleurs ici, partout d'un coup
export const theme = {
	background: "#0F0D1A",
	header: "#12101F",
	panel: "#1E1B2E",
	gradientStart: "#2D2650",
	gradientEnd: "#1A1830",
	accent: "#7C4DFF",
	accentLight: "#00E5FF",
	text: "#F2F2F7",
	textMuted: "#A0A0B8",
	success: "#4CAF50",
	error: "#FF6B6B",
};

// Thème du calendrier (propriétés de la bibliothèque react-native-calendars) aux couleurs de l'appli
export const calendarTheme = {
	calendarBackground: theme.panel,
	textSectionTitleColor: theme.textMuted,
	dayTextColor: theme.text,
	todayTextColor: theme.accentLight,
	textDisabledColor: "#5A5775",
	monthTextColor: theme.text,
	arrowColor: theme.accentLight,
	selectedDayBackgroundColor: theme.accent,
	selectedDayTextColor: "#FFFFFF",
	dotColor: theme.accentLight,
};