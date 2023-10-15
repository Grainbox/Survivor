import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { useTheme } from "../../../hooks/useTheme";
import { darkTheme, lightTheme} from "../../../hooks/theme";
import getStyles from "./MeteoScreen.styles";
import { useLanguage } from '../../../hooks/context/LanguageContext';
import translations from './translations.json';

function MeteoScreen() {
    const { darkMode, toggleDarkMode, phoneMode, togglePhoneMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme);
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('Rennes'); // default to rennes
    const currentDate = new Date().toLocaleDateString();
    const { language } = useLanguage();

    useEffect(() => {
        fetch(`https://wttr.in/${city}?format=%t:%C:%w:%h`) // Use the city from state
            .then(response => response.text())
            .then(data => {
                const [temperature, condition, wind, humidity] = data.split(':');
                setWeatherData({
                    temperature,
                    condition,
                    wind,
                    humidity
                });
            })
            .catch(error => {
                console.error("There was an error fetching the weather data.", error);
            });
    }, [city]); // Add city as a dependency to refetch when city changes

    const getWeatherIcon = () => {

        switch(weatherData.condition) {
            case 'Sunny':
            case 'Clear':
                return require('../../../assets/meteo_sun.png');
            case 'Cloudy':
            case 'Partly cloudy':
                return require('../../../assets/meteo_sun+clouds.png');
            case 'Overcast':
                return require('../../../assets/meteo_clouds.png');
            case 'Moderate or heavy rain shower':
                return require('../../../assets/meteo_rain.png');
            case 'Fog':
            case 'Haze':
            case 'Mist':
                return require('../../../assets/meteo_fog.png');
            case 'Moderate rain':
            case 'Rain shower':
            case 'Moderate or heavy rain shower':
                return require('../../../assets/meteo_rain.png');
            case 'Thundery outbreaks possible':
                return require('../../../assets/meteo_thunderstorm.png');

        }
        return require('../../../assets/meteo_rain.png');
    };

    const getWeatherConditionTxt = () => {
        switch(weatherData.condition) {
            case 'Sunny':
                return translations[language].sunny;
            case 'Clear':
                return translations[language].clear;
            case 'Cloudy':
                return translations[language].cloudy;
            case 'Partly cloudy':
                return translations[language].partlyCloudy;
            case 'Overcast':
                return translations[language].overcast;
            case 'Fog':
                return translations[language].fog;
            case 'Haze':
                return translations[language].haze;
            case 'Mist':
                return translations[language].mist;
            case 'Moderate rain':
                return translations[language].modRain;
            case 'Rain shower':
                return translations[language].rain;
            case 'Moderate or heavy rain shower':
                return translations[language].modOrHeavRain;
            case 'Thundery outbreaks possible':
                return translations[language].thunderyRisk;
            case 'Thunderstorm':
                return translations[language].thunderstorm;
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={translations[language].placeholder}
                placeholderTextColor="grey"
                value={city}
                onChangeText={setCity}
            />
            <View style={styles.meteobox}>
                <Text style={styles.title}>{translations[language].weatherIn}{city.charAt(0).toUpperCase() + city.slice(1)}</Text>
                <Text style={styles.dateText}>{currentDate}</Text>
                {weatherData && (
                    <>
                        <Image source={getWeatherIcon()} style={styles.weatherIcon} />
                        <Text style={styles.weatherText}>{getWeatherConditionTxt()} | {weatherData.temperature}</Text>
                        <Text style={styles.weatherText}>{translations[language].wind}{weatherData.wind}</Text>
                        <Text style={styles.weatherText}>{translations[language].humidity}{weatherData.humidity}</Text>
                    </>
                )}
            </View>
        </View>
    );
}

export default MeteoScreen;
