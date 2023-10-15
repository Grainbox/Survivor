import { StyleSheet } from 'react-native';

const getStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: theme.background, // Utilisez votre couleur d'arrière-plan préférée ici
        },
        searchInput: {
            height: 40,
            borderColor: 'grey',
            borderWidth: 1,
            paddingHorizontal: 8,
            marginBottom: 16,
            color: theme.text,
            textDecorationLine: 'none',
        },
        resultItem: {
            marginBottom: 16,
            padding: 16,
            backgroundColor: theme.background, // Utilisez votre couleur de carte préférée ici
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        companyName: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8,
            color: theme.text,
        },
        siren: {
            fontSize: 16,
            color: theme.text,
        },
        nombreEtablissements: {
            marginTop: 12,
            fontSize: 16,
            color: theme.text,
        },
        nombreEtablissementsOuverts: {
            marginTop: 12,
            fontSize: 16,
            color: theme.text,
        },
        // Styles pour les dirigeants
        dirigeantsLabel: {
            fontWeight: 'bold',
            marginTop: 12,
            fontSize: 18,
            color: theme.text,
        },
        dirigeant: {
            marginTop: 12,
            fontSize: 16,
            color: theme.text,
        },
        dirigeantQualite: {
            fontWeight: 'bold',
            color: theme.text,
        },
        // Styles pour les finances
        finances: {
            marginTop: 12,
            fontSize: 16,
            color: theme.text,
        },
        financesLabel: {
            fontWeight: 'bold',
            color: theme.text,
        },
        // Styles pour l'adresse du siège social
        adresseLabel: {
            fontWeight: 'bold',
            marginTop: 12,
            color: theme.text,
        },
        adresseText: {
            marginBottom: 8,
            color: theme.text,
        },
        // Styles pour d'autres informations que vous pouvez ajouter
        autreInfoLabel: {
            fontWeight: 'bold',
            marginTop: 12,
            color: theme.text,
        },
        autreInfoText: {
            marginBottom: 8,
            color: theme.text,
        },
        // Ajoutez d'autres styles ici en fonction de vos besoins
    }
);

export default getStyles;
