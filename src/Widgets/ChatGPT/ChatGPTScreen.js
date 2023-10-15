import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView } from 'react-native';
import axios from 'axios';
import { useLanguage } from '../../../hooks/context/LanguageContext';
import translations from './translations.json';
import {useTheme} from "../../../hooks/useTheme";
import {darkTheme, lightTheme} from "../../../hooks/theme";
import getStyles from './ChatGPTScreen.styles';
import { AUTHORIZATION } from "@env";

function ChatGPTScreen() {
    const [userInput, setUserInput] = useState('');
    const [responses, setResponses] = useState([]);
    const { language } = useLanguage();
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme);

    const handleSend = async () => {
        try {
            const openaiResponse = await axios.post(
                'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful assistant.',
                        },
                        {
                            role: 'user',
                            content: userInput,
                        },
                    ],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AUTHORIZATION, // Replace with your actual API key
                    },
                }
            );

            const gptResponse = openaiResponse.data.choices?.[0]?.message?.content?.trim();
            setResponses((prev) => [...prev, { text: userInput, from: 'user' }, { text: gptResponse, from: 'gpt' }]);
            setUserInput('');
        } catch (error) {
            console.error('Error interacting with GPT-3:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
                {responses.map((item, index) => (
                    <Text key={index} style={{ textAlign: item.from === 'user' ? 'left' : 'right', marginVertical: 5 }}>
                        {item.text}
                    </Text>
                ))}
            </ScrollView>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TextInput
                    style={{ color: theme.text, flex: 1, borderColor: 'grey', borderWidth: 1, marginRight: 10, padding: 10 }}
                    placeholder='Type your message here...'
                    placeholderTextColor="grey"
                    value={userInput}
                    onChangeText={setUserInput}
                />
                <Button title={translations[language].send} onPress={handleSend}/>
            </View>
        </View>
    );
}

export default ChatGPTScreen;
