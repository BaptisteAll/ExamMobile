# EventEase (ExamMobile) – Document technique

1. **Technologies** : application mobile en React Native avec Expo, navigation gérée par React Navigation.

2. **Écrans** : Login, Register, EventList, AddScreen (un même formulaire sert à ajouter ET à modifier un événement) et Calendar.

3. **Données partagées** : la liste des événements vit dans un Context (`EventsContext`), lu par les écrans d'événements (liste, formulaire, calendrier) avec le hook `useEvents`.

4. **Persistance** : événements et comptes sont sauvegardés en local avec AsyncStorage, sous les clés `events` et `users`.

5. **Authentification** : simplifiée, sans serveur : les comptes sont stockés en local et la connexion compare email et mot de passe.

6. **Date et bonus calendrier** : la date d'un événement est choisie avec un calendrier (bibliothèque `react-native-calendars`), et l'écran Calendar affiche un point sous chaque jour qui a un événement.

7. **Modification de la liste** : on ne modifie jamais l'état directement, on lui donne une nouvelle liste (`filter`, `map`, `[...events, nouvelEvent]`).

8. **Limite connue** : les mots de passe sont stockés en clair, acceptable pour un prototype mais à ne pas faire en production.

9. **Organisation** : les écrans sont rangés dans le dossier `screens`, les composants réutilisables (`AppButton`, `AppInput`) dans `components`. À la racine se trouvent `App.js` (point d'entrée : il déclare les écrans), `EventsContext.js` (données partagées) et `theme.js` (palette de couleurs de l'application).

10. **Améliorations possibles** :
    - rattacher les événements à l'utilisateur connecté (aujourd'hui, la liste est commune à tous les comptes) ;
    - ne plus stocker les mots de passe en clair ;
    - ajouter un mode clair/sombre commutable et des icônes.
    
## Lancer le projet

```bash
npm install
npx expo start --web
```