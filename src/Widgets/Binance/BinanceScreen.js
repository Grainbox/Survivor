import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Linking } from 'react-native';
import axios from 'axios';
import { useTheme } from "../../../hooks/useTheme";
import { darkTheme, lightTheme} from "../../../hooks/theme";
import getStyles from "./BinanceScreen.styles";

function BinanceScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode, toggleDarkMode, phoneMode, togglePhoneMode } = useTheme();
  const theme = darkMode ? darkTheme : lightTheme;
  const styles = getStyles(theme);

  useEffect(() => {
    // Define the Binance API URL
    const apiUrl = 'https://api.binance.com/api/v3/ticker/24hr';

    // Fetch data from the Binance API
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={{color:theme.text}}>Loading...</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.symbol}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={{color:theme.text}}>{item.symbol}</Text>
              <Text style={{color:theme.text}}>Last Price: {item.lastPrice}</Text>
              <Text style={{color:theme.text}}>Volume: {item.volume}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

export default BinanceScreen;
