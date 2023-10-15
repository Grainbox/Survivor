import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Linking } from 'react-native';
import { useTheme } from "../../../hooks/useTheme";
import { darkTheme, lightTheme } from "../../../hooks/theme";
import { NEWS_API_KEY } from "@env";

function NewsWidget() {
    const [news, setNews] = useState([]);
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;

    useEffect(() => {
        const endpoint = `https://newsapi.org/v2/top-headlines?country=fr&apiKey=${NEWS_API_KEY}`;

        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                if (data.articles) {
                    setNews(data.articles);
                }
            })
            .catch(error => {
                console.error("Error fetching news:", error);
            });
    }, []);

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: theme.background }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: theme.text }}>Top Headlines</Text>
            <FlatList
                data={news}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 15 }}>
                            {console.log(item.url)}
                        <Text style={{ fontWeight: 'bold', color: theme.text }}
                        onPress={() => Linking.openURL(item.url)}>{item.title}</Text>
                        <Text style={{ color: theme.text }}>{item.description}</Text>
                    </View>
                )}
            />
        </View>
    );
}

export default NewsWidget;
