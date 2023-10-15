import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import {useTheme} from "../../../hooks/useTheme";
import {darkTheme, lightTheme} from "../../../hooks/theme";
import getStyles from "./Pomodoro.styles";
import { useLanguage } from '../../../hooks/context/LanguageContext';
import translations from './translations.json';

const POMODORO_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function PomodoroTimer() {
    const [secondsLeft, setSecondsLeft] = useState(POMODORO_TIME);
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [customPomodoroTime, setCustomPomodoroTime] = useState(POMODORO_TIME);
    const [customBreakTime, setCustomBreakTime] = useState(BREAK_TIME);
    const { darkMode, toggleDarkMode, phoneMode, togglePhoneMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme);
    const { language } = useLanguage();

    useEffect(() => {
        if (isActive && !intervalId) {
            const id = setInterval(() => {
                setSecondsLeft(prevSeconds => {
                    if (prevSeconds > 0) {
                        return prevSeconds - 1;
                    } else {
                        if (isBreak) {
                            setIsBreak(false);
                            return customPomodoroTime;
                        } else {
                            setIsBreak(true);
                            setIsActive(false);
                            return customBreakTime;
                        }
                    }
                });
            }, 1000);

            setIntervalId(id);
        } else if (!isActive && intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isActive, isBreak, intervalId, customPomodoroTime, customBreakTime]);

    const toggleTimer = () => {
        if (!isActive) {
            setSecondsLeft(isBreak ? customBreakTime : customPomodoroTime);
        }
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setIsBreak(false);
        setSecondsLeft(POMODORO_TIME);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const CustomButton = ({ title, onPress, style, textStyle }) => (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.text2}>{translations[language].pomodoroTime}</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="grey"
                    keyboardType="number-pad"
                    value={isNaN(customPomodoroTime/60) ? '0' : (customPomodoroTime/60).toString()}
                    onChangeText={text => {
                        const value = parseInt(text);
                        if (!isNaN(value)) {
                            setCustomPomodoroTime(value * 60);
                        } else {
                            setCustomPomodoroTime(0);
                        }
                    }}

                />
            <View style={styles.line}></View>
                <Text style={styles.text3}>{translations[language].breakTime}</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="grey"
                    keyboardType="number-pad"
                    value={isNaN(customBreakTime/60) ? '0' : (customBreakTime/60).toString()}
                    onChangeText={text => {
                        const value = parseInt(text);
                        if (!isNaN(value)) {
                            setCustomBreakTime(value * 60);
                        } else {
                            setCustomBreakTime(0);
                        }
                    }}
                />
            </View>
            <Text style={styles.timerText}>
                {isBreak ? translations[language].activityBreak : translations[language].activityPomo}
            </Text>
            <Text style={styles.timerText}>
               {formatTime(secondsLeft)}
            </Text>
            <View style={styles.buttons}>
                <CustomButton title={isActive ? translations[language].pauseButton : translations[language].startButton} onPress={toggleTimer} />
                <CustomButton title={translations[language].resetButton} onPress={resetTimer} />
            </View>
        </View>
    );
}

export default PomodoroTimer;
