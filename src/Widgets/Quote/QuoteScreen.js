import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Linking } from 'react-native';
import axios from 'axios';
import { useTheme } from "../../../hooks/useTheme";
import { darkTheme, lightTheme } from "../../../hooks/theme";
import getStyles from './QuoteScreen.styles';
import { X_API_KEY } from "@env";

function QuoteScreen() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();
  const theme = darkMode ? darkTheme : lightTheme;
  const styles = getStyles(theme);

  useEffect(() => {
    axios
      .get('https://api.api-ninjas.com/v1/quotes?category=knowledge', {
        headers: {
          'X-Api-Key': X_API_KEY,
        },
      })
      .then((response) => {
        console.log(response.data);
        const firstQuote = response.data[0];
        if (firstQuote) {
          setQuote(firstQuote.quote);
          setAuthor(firstQuote.author);
          setError(null);
        } else {
          setError('No quotes found');
        }
      })
      .catch((error) => {
        setQuote('');
        setAuthor('');
        setError(error.message);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quote of the Day</Text>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>"{quote}"</Text>
          <Text style={styles.authorText}>- {author}</Text>
        </View>
      )}
    </View>
  );
}

export default QuoteScreen;
