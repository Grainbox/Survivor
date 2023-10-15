# Génération d'un APK React Native avec Gradlew

Ce document explique comment générer un APK de votre application React Native en utilisant l'utilitaire Gradlew.

## Prérequis

- Node.js installé
- React Native CLI installé
- Android Studio et SDK installés
- Environnement de développement configuré pour React Native

## Étapes

### 1. Naviguer vers le répertoire du projet

Ouvrez un terminal et naviguez vers le répertoire de votre projet React Native.

```bash
cd /chemin/vers/votre/projet
```

### 2. Installer les dépendances

Si ce n'est pas déjà fait, installez les dépendances du projet.

```bash
npm install
```

ou si vous utilisez Yarn :

```bash
yarn install
```

### 3. Naviguer vers le dossier `android`

Allez dans le dossier `android` de votre projet.

```bash
cd android
```

### 4. Exécuter Gradlew pour générer l'APK

Dans le dossier `android`, vous pouvez maintenant utiliser la commande suivante pour générer un APK.

Pour un APK de développement :

```bash
./gradlew assembleDebug
```

Pour un APK de production :

```bash
./gradlew assembleRelease
```

### 5. Trouver l'APK généré

Après avoir exécuté ces commandes, l'APK sera généré et placé dans le dossier suivant :

- Pour un APK de développement : `app/build/outputs/apk/debug/app-debug.apk`
- Pour un APK de production : `app/build/outputs/apk/release/app-release.apk`

## Conseils de dépannage

- Assurez-vous que tous les outils de développement Android sont correctement installés et que les variables d'environnement sont configurées.
- Exécutez `./gradlew clean` pour nettoyer le projet si vous rencontrez des problèmes lors de la génération.

