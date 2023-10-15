import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Linking } from 'react-native';
import axios from 'axios';
import { useLanguage } from '../../../hooks/context/LanguageContext';
import translations from './translations.json';
import { useTheme } from "../../../hooks/useTheme";
import { darkTheme, lightTheme } from "../../../hooks/theme";
import getStyles from "./WikipediaScreen.styles";

function WikipediaScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const { language } = useLanguage();
  const { darkMode } = useTheme();
  const theme = darkMode ? darkTheme : lightTheme;
  const styles = getStyles(theme);

  const searchWikipedia = () => {
    if (!searchTerm) {
      return;
    }

    axios
      .get(translations[language].wikiAPI, {
        params: {
          action: 'query',
          list: 'search',
          format: 'json',
          srsearch: searchTerm,
        },
      })
      .then((response) => {
        setSearchResults(response.data.query.search);
        setError(null);
      })
      .catch((error) => {
        setSearchResults([]);
        setError(error.message);
      });
  };

  const openWikipediaPage = (title) => {
    Linking.openURL(translations[language].wikiURL + title);
  };

  function stripHtmlTags(html) {
    return html.replace(/<[^>]*>/g, '');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translations[language].wikiTitle}</Text>
      <TextInput
        placeholderTextColor="grey"
        style={styles.input}
        placeholder={translations[language].wikiPlaceholder}
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <Button title={translations[language].searchButton} onPress={searchWikipedia} />
      {error && <Text>Error: {error}</Text>}
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.pageid.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text
              style={styles.resultTitle}
              onPress={() => openWikipediaPage(item.title)}
            >
              {item.title}
            </Text>
            <Text style={styles.resultSnippet}>{stripHtmlTags(item.snippet)}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default WikipediaScreen;
