import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Linking } from 'react-native';
import axios from 'axios';
import { useTheme } from "../../../hooks/useTheme";
import { darkTheme, lightTheme } from "../../../hooks/theme";
import getStyles from "./EntrepriseScreen.styles";
import { useLanguage } from '../../../hooks/context/LanguageContext';
import translations from './translations.json';

function EntrepriseScreen() {
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme);
    const { language } = useLanguage();

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `https://recherche-entreprises.api.gouv.fr/search?q=${searchQuery}`
            );
            setSearchResults(response.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{translations[language].title}</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Recherchez une entreprise..."
                placeholderTextColor={'grey'}
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
            <Button
                title="Rechercher"
                onPress={handleSearch}
            />
            <FlatList
                data={searchResults}
                renderItem={({ item }) => (
                    <View style={styles.resultItem}>
                        <Text style={styles.companyName}>{item.nom_complet}</Text>
                        <Text style={styles.siren}>SIREN : {item.siren}</Text>
                        <Text style={styles.nombreEtablissements}>Nombre d'établissements : {item.nombre_etablissements}</Text>
                        <Text style={styles.nombreEtablissementsOuverts}>Nombre d'établissements ouverts : {item.nombre_etablissements_ouverts}</Text>

                        {/* Affichez d'autres informations ici */}

                        <Text style={styles.adresseLabel}>Adresse du siège social :</Text>
                        <Text style={styles.adresseText}>{item.siege.adresse}</Text>
                        <Text style={{color:theme.text}}>{item.siege.code_postal} {item.siege.libelle_commune}</Text>

                        <Text style={styles.dirigeantsLabel}>Dirigeants :</Text>
                        {item.dirigeants.map((dirigeant, index) => (
                            <View key={index} style={styles.dirigeant}>
                                <Text style={styles.dirigeantQualite}>{dirigeant.qualite}:</Text>
                                <Text style={{color:theme.text}}>{dirigeant.nom} {dirigeant.prenoms}</Text>
                            </View>
                        ))}

                    <Text style={styles.financesLabel}>Finances :</Text>
                    {item.finances && Object.keys(item.finances).map((annee, index) => (
                        <View key={index}>
                            <Text style={styles.finances}>Année {annee} :</Text>
                            <Text style={styles.finances}>Chiffre d'affaires : {item.finances[annee].ca} €</Text>
                            <Text style={styles.finances}>Résultat net : {item.finances[annee].resultat_net} €</Text>
                        </View>
                    ))}
                    </View>
                )}
                keyExtractor={(item) => item.siren}
            />
        </View>
    );
}

export default EntrepriseScreen;
