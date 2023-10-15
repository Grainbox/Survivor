import React, { useState, useContext } from 'react';
import { View, Text, Switch, Alert } from 'react-native';
import getStyles from './Settings.styles';
import { useTheme } from '../../hooks/useTheme';
import { lightTheme, darkTheme } from '../../hooks/theme';
import { SurvivorContext } from '../../hooks/context/SurvivorContext';
import { useNavigation } from "@react-navigation/native";
import { useLanguage,  } from '../../hooks/context/LanguageContext';
import translations from './translations.json';
import { Picker } from '@react-native-picker/picker';

function SettingsScreen() {
    console.log('SettingsScreen');
    const { darkMode, toggleDarkMode, phoneMode, togglePhoneMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme);
    const name = useState('');
    const survivorContext = useContext(SurvivorContext);
    const navigation = useNavigation();
    const { language, setLanguage } = useLanguage();
    const [textColor, setTextColor] = useState(null);

    const logout = () => {
        Alert.alert(
            translations[language].alertTitle,
            translations[language].alertMessage,
            [
                {
                    text: translations[language].cancelButton,
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: translations[language].logoutButton, onPress: () => {
                        survivorContext.setToken('');
                        survivorContext.setConnected(false);
                        navigation.navigate('Accueil2');
                    }
                }
            ],
            { cancelable: false }
        );
    };

    function setNewTextColor() {
        setTextColor('white');
    }

    function backTextColor() {
        setTextColor('');
    }

    return (<>
        <View style={[styles?.container]}>
            <View style={[styles?.header]}>
                <Text style={[styles?.title]}>{translations[language].theme}</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={toggleDarkMode}
                    value={darkMode}
                />
            </View>
            <View style={{borderColor: theme.text, borderLeftWidth: 0.2, borderRightWidth: 0.2}}>
                <Picker
                    selectedValue={language}
                    onValueChange={(itemValue) => setLanguage(itemValue)}
                    dropdownIconColor={theme.text}
                    onFocus={setNewTextColor}
                    onBlur={backTextColor}
                >
                    <Picker.Item label="English" value="en" style={styles.languageSelector} color={textColor}/>
                    <Picker.Item label="Français" value="fr" style={styles.languageSelector} color={textColor}/>
                </Picker>
            </View>
            <View style={[styles?.header]}>
                <Text style={[styles?.title]} onPress={() => logout()}>{translations[language].logout}</Text>
            </View>
        </View>
        <Text style={styles.cgu} onPress={() => navigation.navigate('#')}>{translations[language].footerText}</Text>
    </>);
}

export default SettingsScreen;
