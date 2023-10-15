import { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = async (value) => {
        setDarkMode(value);
        try {
            await AsyncStorage.setItem('@darkMode', JSON.stringify(value));
        } catch (error) {
            console.error('Error saving dark mode:', error);
        }
    };

    useEffect(() => {
        const loadDarkMode = async () => {
            try {
                const storedDarkMode = await AsyncStorage.getItem('@darkMode');
                if (storedDarkMode !== null) {
                    toggleDarkMode(JSON.parse(storedDarkMode));
                }
            } catch (error) {
                console.error('Error loading dark mode:', error);
            }
        };
        loadDarkMode();
    }, [toggleDarkMode]);

    const value = {
        darkMode,
        toggleDarkMode,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
