    // const githubRepoOwner = 'EpitechPromo2026';
    // const githubRepoName = 'B-SVR-500-REN-5-1-survivor-mathys.thevenot';
    // const personalAccessToken = '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';

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { useLanguage } from '../../../hooks/context/LanguageContext';
import translations from './translations.json';
import {useTheme} from "../../../hooks/useTheme";
import {darkTheme, lightTheme} from "../../../hooks/theme";
import getStyles from './GithubScreen.styles';

function GithubScreen() {
    const [issues, setIssues] = useState([]);
    const [error, setError] = useState(null);
    const [githubRepoOwner, setGithubRepoOwner] = useState('');
    const [githubRepoName, setGithubRepoName] = useState('');
    const [personalAccessToken, setPersonalAccessToken] = useState('');
    const { language } = useLanguage();
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme);

    useEffect(() => {
    if (githubRepoOwner && githubRepoName && personalAccessToken) {
        axios
        .get(`https://api.github.com/repos/${githubRepoOwner}/${githubRepoName}/issues`, {
            headers: {
                Authorization: `token ${personalAccessToken}`,
            },
        })
        .then((response) => {
            setIssues(response.data);
        })
        .catch((error) => {
            setError(error.message);
        });
    }
    }, [githubRepoOwner, githubRepoName, personalAccessToken]);

    const handleFetchIssues = () => {
        if (githubRepoOwner && githubRepoName && personalAccessToken) {
            axios
            .get(`https://api.github.com/repos/${githubRepoOwner}/${githubRepoName}/issues`, {
                headers: {
                    Authorization: `token ${personalAccessToken}`,
                },
            })
            .then((response) => {
                setIssues(response.data);
            })
            .catch((error) => {
                setError(error.message);
            });
        }
    };

    return (
    <View style={styles.container}>
        <Text style={styles.title}>{translations[language].githubIssues}</Text>
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholderTextColor="grey"
                placeholder={translations[language].githubRepoOwner}
                value={githubRepoOwner}
                onChangeText={(text) => setGithubRepoOwner(text)}
            />
            <TextInput
                style={styles.input}
                placeholderTextColor="grey"
                placeholder={translations[language].githubRepoName}
                value={githubRepoName}
                onChangeText={(text) => setGithubRepoName(text)}
            />
            <TextInput
                style={styles.input}
                placeholderTextColor="grey"
                placeholder={translations[language].personalAccessToken}
                value={personalAccessToken}
                onChangeText={(text) => setPersonalAccessToken(text)}
                secureTextEntry={true}
            />
            <Button title={translations[language].fetchIssues} onPress={handleFetchIssues} />
        </View>
        {error && <Text>{translations[language].error}: {error}</Text>}
        {issues.length === 0 && <Text>{translations[language].noIssuesFound}</Text>}
        <FlatList
            data={issues}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <View style={styles.issueItem}>
                <Text style={styles.issueTitle}>{item.title}</Text>
                <Text style={styles.issueBody}>{item.body}</Text>
            </View>
        )}
        />
    </View>
    );
}

export default GithubScreen;
