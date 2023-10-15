import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import {useTheme} from "../../../hooks/useTheme";
import {darkTheme, lightTheme} from "../../../hooks/theme";
import getStyles from "./NasaScreen.styles";
import { NASA_API_KEY } from "@env";

const NASA_ENDPOINT = 'https://api.nasa.gov/planetary/apod';

function NasaScreen () {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { darkMode, toggleDarkMode, phoneMode, togglePhoneMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(NASA_ENDPOINT, {
                    params: { api_key: NASA_API_KEY },
                });

                setData(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    if (!data) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{data.title}</Text>
            <Image style={styles.image} source={{ uri: data.url }} resizeMode="cover" />
            <Text style={styles.description}>{data.explanation}</Text>
        </View>
    );
};

export default NasaScreen;
