import React, { useState, useRef, useEffect, useContext } from 'react';
import {Text, View, TextInput, Animated, Alert, ImageBackground} from 'react-native';
import getStyles from './Login.styles';
import { useTheme } from '../../hooks/useTheme';
import { darkTheme, lightTheme } from '../../hooks/theme';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from "@react-navigation/native";
import {getUserApi} from '../../constant/Firebase/podcastService';
import {SurvivorContext} from "../../hooks/context/SurvivorContext";
import { useLanguage } from '../../hooks/context/LanguageContext';
import translations from './translations.json';
import { ScrollView } from 'react-native-gesture-handler';

function Login() {
    const navigation = useNavigation();
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const boatAnimation = useRef(new Animated.Value(100)).current;
    const pitchAnimation = useRef(new Animated.Value(0)).current;
    const boatTranslateX = useRef(new Animated.Value(-100)).current; // Initial off-screen position
    const waveAnimation = useRef(new Animated.Value(0)).current;
    const survivorContext = useContext(SurvivorContext);
    const { language } = useLanguage();

    useEffect(() => {
        // Infinite pitching animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(pitchAnimation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pitchAnimation, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]),
            Animated.sequence([
                Animated.timing(waveAnimation, {
                    toValue: 1,
                    duration: 5000,
                    useNativeDriver: false,
                }),
                Animated.timing(waveAnimation, {
                    toValue: 0,
                    duration: 5000,
                    useNativeDriver: false,
                })
            ])
        ).start();

    }, []);

    const wavePositionInterpolation = waveAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });

    const handleEmailChange = (text) => {
        setEmail(text);
        const newPosition = ((text.length / 50) * 300) + 100;
        Animated.timing(boatTranslateX, {
            toValue: newPosition,
            duration: 150,
            useNativeDriver: true, // Set to true since translateX is supported
        }).start();
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        const newPosition = ((text.length / 50) * 300) + 100;
        Animated.timing(boatTranslateX, {
            toValue: newPosition,
            duration: 150,
            useNativeDriver: true, // Set to true since translateX is supported
        }).start();
    };

    const interpolatedPitch = pitchAnimation.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: ['-10deg', '0deg', '10deg']
    });

    return (
        <View style={[styles.container, styles.overlay]}>
            <Text style={styles.title}>{translations[language].loginTitle}</Text>
            <View style={styles.inputBox}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={translations[language].emailPlaceholder}
                        placeholderTextColor="grey"
                        value={email}
                        onChangeText={handleEmailChange}
                        style={styles.input}
                        maxLength={50}
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={translations[language].passwordPlaceholder}
                        placeholderTextColor="grey"
                        value={password}
                        onChangeText={handlePasswordChange}
                        style={styles.input}
                        maxLength={20}
                        secureTextEntry={true}
                        autoCapitalize="none"
                    />
                </View>
                <Animated.View style={{ width: '200%', transform: [{ translateX: wavePositionInterpolation }] }}>
                    <LinearGradient
                        colors={['#ADD8E6', 'transparent', '#ADD8E6']}
                        style={styles.waveBorder}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                    />
                </Animated.View>
            </View>
            {email.length > 0 && password.length > 0 &&
                <Text onPress={async () => {
                    const token = await getUserApi(email, password);
                    if (token != null) {
                        survivorContext.setToken(token);
                        survivorContext.setEmail(email);
                        survivorContext.setPassword(password);
                        survivorContext.setConnected(true);
                        navigation.navigate('Accueil2');
                    } else {
                        Alert.alert(translations[language].errorAlert, translations[language].wrongCredentials);
                    }
                }} style={styles.button}>{translations[language].loginButton}</Text>
            }
        </View>
    );
}

export default Login;
