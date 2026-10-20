# EventEase (ExamMobile)

1. **Technologies** : application mobile en React Native avec Expo, navigation gérée par React Navigation.

2. **Écrans** : Login, Register, EventList et AddScreen (un même formulaire sert à ajouter ET à modifier un événement).

3. **Données partagées** : la liste des événements vit dans un Context (`EventsContext`), lu par tous les écrans avec le hook `useEvents`.

4. **Persistance** : événements et comptes sont sauvegardés en local avec AsyncStorage, sous les clés `events` et `users`.

5. **Authentification** : simplifiée, sans serveur : les comptes sont stockés en local et la connexion compare email et mot de passe.

6. **Date** : choisie avec un calendrier (bibliothèque `react-native-calendars`).

7. **Modification de la liste** : on ne modifie jamais l'état directement, on lui donne une nouvelle liste (`filter`, `map`, `[...events, nouvelEvent]`).

8. **Limite connue** : Les mots de passes sont stockés en clair, acceptable pour un prototype mais à ne pas faire en production.

9. **Organisation** : les écrans sont rangés dans le dossier `screens`. À la racine se trouvent `App.js` (point d'entrée : il déclare les écrans) et `EventsContext.js` (données partagées par tous les écrans).

10. **Amélioration** Avec un peu plus de temps, j'aurais tenté de faire quelque chose de plus propre et de plus joli à regarder. Avec probablement des features en plus.