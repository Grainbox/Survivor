/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useContext, useState} from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import getStyles from './App.styles';
import {useTheme} from '../../hooks/useTheme';
import {darkTheme, lightTheme} from '../../hooks/theme';
import { ThemeProvider } from '../../hooks/useTheme';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingScreen from '../Settings/';
import HomeScreen from '../HomeScreen/';
import GalleryScreen from "../Gallery";
import ProfileScreen from "../Profile";
import Login from "../Login";
import SearchScreen from "../Search";
import { enableScreens } from 'react-native-screens';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SurvivorContext, SurvivorProvider} from '../../hooks/context/SurvivorContext';
import { useFonts } from 'expo-font';
import NetInfo from "@react-native-community/netinfo";
import { LanguageProvider, useLanguage } from '../../hooks/context/LanguageContext';
import translations from './translations.json';
import GameScreen from "../Widgets/Game";
import PomodoroScreen from "../Widgets/Pomodoro";
import MeteoScreen from "../Widgets/Meteo/";
import { ChatScreen, DisplayChat, CreateGroupScreen } from "../Widgets/Chat";
import CalendarScreen from "../Widgets/Calendar";
import ToDoListScreen from "../Widgets/ToDoList";
import NasaScreen from "../Widgets/Nasa";
import GithubScreen from "../Widgets/Github";
import NotePadScreen from "../Widgets/NotePad";
import ChatGPTScreen from "../Widgets/ChatGPT";
import TreeScreen from "../Widgets/Tree";
import NewsScreen from "../Widgets/News";
import CalculatorScreen from "../Widgets/Calculator";
import MusicScreen from "../Widgets/Music";
import WikipediaScreen from "../Widgets/Wikipedia";
import QuoteScreen from '../Widgets/Quote';
import CallScreen from "../Widgets/Call";
import DiscordScreen from '../Widgets/Discord';
import YoutubeScreen from '../Widgets/Youtube';
import BinanceScreen from '../Widgets/Binance';
import EntrepriseScreen from "../Widgets/Entreprise";
// add import widget here {DO NOT REMOVE THIS LINE}

enableScreens();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme);
    const survivorContext = useContext(SurvivorContext);
    const [isWifi, setIsWifi] = useState(null);
    const { language } = useLanguage();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            //setIsWifi(state.isConnected);
            setIsWifi(state.isConnected);
            console.log("Connection type", state.type);
        });

        // Cleanup function
        return () => {
            unsubscribe();
        };
    }, []);

    const getTabBarIcon = (route, focused, color, size) => {
        let iconName;
        switch (route.name) {
            case 'Accueil':
                iconName = focused ? 'home-variant' : 'home-variant-outline';
                return <Icon name="home" size={30} style={{color: theme.text}} />;
            case 'Gallery':
                return <Icon name="picture-o" size={30} style={{color: theme.text}} />;
            case 'Search':
                return <Icon name="search" size={30} style={{color: theme.text}} />;
            default:
                return null;
        }
    };

    const getTabBarIconNoWifi = (route, focused, color, size) => {
        let iconName;
        switch (route.name) {
            case 'Accueil':
                iconName = focused ? 'home-variant' : 'home-variant-outline';
                return <Icon name="home" size={30} style={{color: theme.text}} />;
            default:
                return null;
        }
    };

    if (isWifi === null) {
        return (
            <View>
                <Text>{translations[language].loading}</Text>
            </View>
        );
    } else if (isWifi) {
    return survivorContext.connected ? (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: theme.AppButton,
                tabBarInactiveTintColor: theme.AppButton,
                tabBarStyle: styles.tabBar,
                tabBarIcon: ({ focused, size }) =>
                    getTabBarIcon(route, focused, theme.AppButton, size),
            })}
            style={{backgroundColor: theme.background}}
        >
            <Tab.Screen name="Accueil" component={HomeWrapper} options={{ headerShown: false }} />
            <Tab.Screen name="Gallery" component={GalleryScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    ) : null;
    } else {
        return survivorContext.connected ? (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: theme.AppButton,
                    tabBarInactiveTintColor: theme.AppButton,
                    tabBarStyle: styles.tabBar,
                    tabBarIcon: ({ focused, size }) =>
                        getTabBarIconNoWifi(route, focused, theme.AppButton, size),
                })}
                style={{backgroundColor: theme.background}}
            >
                <Tab.Screen name="Accueil" component={HomeWrapper} options={{ headerShown: false }} />
            </Tab.Navigator>
        ) : null;
    }
}

function HomeWrapper() {
    return (
        <View style={{ flex: 1 }}>
            {<HomeScreen />}
        </View>
    );
}

function SettingsWrapper() {
    return (
        <View style={{ flex: 1 }}>
            {<SettingScreen />}
        </View>
    );
}

function MainStackNavigator() {
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme);
    const survivorContext = useContext(SurvivorContext);

    const commonScreenOptions = {
        headerTintColor: theme.AppButton,
        headerBackTitleVisible: false,
        headerBackImage: () => <Icon name="arrow-left" size={30} color={theme.text} />,
    };

    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerTintColor: theme.AppButton,
                    headerStyle: { backgroundColor: theme.AppButton, height: 90 },
                }}
            >
                <Stack.Screen
                    name="Accueil2"
                    component={survivorContext.connected ? MainTabNavigator : HomeScreen}
                    options={({ navigation }) => ({
                        headerShown: true,

                    headerTitleStyle: { color: theme.AppButton },
                    headerTitle: () => (<>
                      <View style={styles.header}>
                        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                          <View style={styles.logo}>
                            <Image
                              source={theme == darkTheme
                                ? require('../../assets/logo_white.png')
                                : require('../../assets/logo_dark.png')}
                                style={styles.imageLogo}
                              resizeMode="contain"
                            />
                          </View                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  >
                          <Text style={styles.headerTitle}>Survivor</Text>
                          <Icon  style={styles.gearsIcon} name="gears" size={30} onPress={() => navigation.navigate('Settings')}/>
                        </View>
                      </View>
                    </>),
                  })}
                />
                <Stack.Screen name="Settings" component={SettingScreen} options={{ title: 'Paramètres', ...commonScreenOptions }}/>
                <Stack.Screen name="Gallery" component={GalleryScreen} options={{
                        title: 'Gallery',
                        headerTintColor: theme.AppButton,
                        headerBackTitleVisible: false,
                    }}
                />
                <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile', ...commonScreenOptions }}/>
                <Stack.Screen name="Login" component={Login} options={{ title: 'Login', ...commonScreenOptions }}/>
                <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Game', ...commonScreenOptions }}/>
                <Stack.Screen name="Pomodoro" component={PomodoroScreen} options={{ title: 'Pomodoro', ...commonScreenOptions }}/>
                <Stack.Screen name="Meteo" component={MeteoScreen} options={{ title: 'Meteo', ...commonScreenOptions }}/>
                <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat', ...commonScreenOptions }}/>
                <Stack.Screen name="DisplayChat" component={DisplayChat}
                    options={({ route }) => ({
                        title: route.params?.namegroup || 'Default Title',
                        headerShown: true,
                        headerTintColor: theme.AppButton,
                        headerBackTitleVisible: false,
                        headerBackImage: () => (
                            <Icon name="arrow-left" size={30} color={theme.text} />
                        ),
                    })}/>
                <Stack.Screen name="Calendar" component={CalendarScreen} options={{ title: 'Calendar', ...commonScreenOptions }}/>
                <Stack.Screen name="ToDoList" component={ToDoListScreen} options={{ title: 'ToDoList', ...commonScreenOptions }}/>
                <Stack.Screen name="Search" component={SearchScreen} options={{
                        title: 'Search',
                        headerTintColor: theme.AppButton,
                        headerBackTitleVisible: false,
                    }}/>
                <Stack.Screen name="CreateGroup" component={CreateGroupScreen} options={{ title: 'Create Group', ...commonScreenOptions }}/>
                <Stack.Screen name="Nasa" component={NasaScreen} options={{ title: 'Nasa', ...commonScreenOptions }}/>
                <Stack.Screen name="Github" component={GithubScreen} options={{ title: 'Github Issues', ...commonScreenOptions }}/>
                <Stack.Screen name="ChatGPT" component={ChatGPTScreen} options={{ title: 'ChatGPT', ...commonScreenOptions }}/>
                <Stack.Screen name="Tree" component={TreeScreen} options={{ title: 'Tree', ...commonScreenOptions }}/>
                <Stack.Screen name="News" component={NewsScreen} options={{ title: 'News', ...commonScreenOptions }}/>
                <Stack.Screen name="Music" component={MusicScreen} options={{ title: 'Music', ...commonScreenOptions }}/>
                <Stack.Screen name="Wikipedia" component={WikipediaScreen} options={{ title: 'Wikipedia Search', ...commonScreenOptions }}/>
                <Stack.Screen name="Quote" component={QuoteScreen} options={{ title: 'Quote of the Day', ...commonScreenOptions }}/>
                <Stack.Screen name="NotePad" component={NotePadScreen} options={{ title: 'NotePad', ...commonScreenOptions }}/>
                <Stack.Screen name="Calculator" component={CalculatorScreen} options={{ title: 'Calculator', ...commonScreenOptions }}/>
                <Stack.Screen name="Call" component={CallScreen} options={{ title: 'Call', ...commonScreenOptions }}/>
                <Stack.Screen name="Discord" component={DiscordScreen} options={{ title: 'Discord', ...commonScreenOptions }}/>
                <Stack.Screen name="Youtube" component={YoutubeScreen} options={{ title: 'Youtube Search', ...commonScreenOptions }}/>
                <Stack.Screen name="Binance" component={BinanceScreen} options={{ title: 'Binance 24H', ...commonScreenOptions }}/>
                <Stack.Screen name="Entreprise" component={EntrepriseScreen} options={{ title: 'Entreprise Search', ...commonScreenOptions }}/>
                {/*add widget here {DO NOT REMOVE THIS LINE}*/}
            </Stack.Navigator>
        </>
    );
}

function MainStackNavigatorNoWifi() {
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme);
    const survivorContext = useContext(SurvivorContext);

    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerTintColor: theme.AppButton,
                    headerStyle: { backgroundColor: theme.AppButton, height: 90 },
                }}
            >
                <Stack.Screen
                    name="Accueil2"
                    component={survivorContext.connected ? MainTabNavigator : HomeScreen}
                    options={({ navigation }) => ({
                        headerShown: true,

                        headerTitleStyle: { color: theme.AppButton },
                        headerTitle: () => (<>
                            <View style={styles.header}>
                                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <View style={styles.logo}>
                                        <Image
                                            source={theme == darkTheme
                                                ? require('../../assets/logo_white.png')
                                                : require('../../assets/logo_dark.png')}
                                            style={styles.imageLogo}
                                            resizeMode="contain"
                                        />
                                    </View                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  >
                                    <Text style={styles.headerTitle}>Survivor</Text>
                                    <Icon  style={styles.gearsIcon} name="gears" size={30} onPress={() => navigation.navigate('Settings')}/>
                                </View>
                            </View>
                        </>),
                    })}
                />
                <Stack.Screen
                    name="Settings"
                    component={SettingScreen}
                    options={{
                        title: 'Paramètres',
                        headerTintColor: theme.AppButton,
                        headerBackTitleVisible: false,
                        headerBackImage: () => (
                            <Icon name="arrow-left" size={30} color={theme.text} />
                        ),
                    }}
                />
                <Stack.Screen
                    name="Game"
                    component={GameScreen}
                    options={{
                        title: 'Game',
                        headerTintColor: theme.AppButton,
                        headerBackTitleVisible: false,
                        headerBackImage: () => (
                            <Icon name="arrow-left" size={30} color={theme.text} />
                        ),
                    }}
                />
                <Stack.Screen
                    name="Pomodoro"
                    component={PomodoroScreen}
                    options={{
                        title: 'Pomodoro',
                        headerTintColor: theme.AppButton,
                        headerBackTitleVisible: false,
                        headerBackImage: () => (
                            <Icon name="arrow-left" size={30} color={theme.text} />
                        ),
                    }}
                />
                <Stack.Screen
                    name="ToDoList"
                    component={ToDoListScreen}
                    options={{
                        title: 'ToDoList',
                        headerTintColor: theme.AppButton,
                        headerBackTitleVisible: false,
                        headerBackImage: () => (
                            <Icon name="arrow-left" size={30} color={theme.text} />
                        ),
                    }}
                />
            </Stack.Navigator>
        </>
    );
}

function MainApp() {
    console.log('MainApp');
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme);
    const isDarkMode = useColorScheme() === 'dark';
    const [isWifi, setIsWifi] = useState(null);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            //setIsWifi(state.isConnected);
            setIsWifi(state.isConnected);
            console.log("Connection type", state.type);
        });

        // Cleanup function
        return () => {
            unsubscribe();
        };
    }, []);

    if (isWifi === null) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    } else if (isWifi) {
        return (
            <NavigationContainer>
                <StatusBar
                    barStyle={darkMode ? 'light-content' : 'dark-content'}
                    backgroundColor={theme.AppButton}
                />
                <SurvivorProvider>
                    <MainStackNavigator/>
                </SurvivorProvider>
            </NavigationContainer>
        );
    } else {
        return (
            <NavigationContainer>
                <StatusBar
                    barStyle={darkMode ? 'light-content' : 'dark-content'}
                    backgroundColor={theme.AppButton}
                />
                <SurvivorProvider>
                    <MainStackNavigatorNoWifi />
                </SurvivorProvider>
            </NavigationContainer>
        );
    }
}

export default function App() {
    return (
        <LanguageProvider>
            <ThemeProvider>
                <MainApp/>
            </ThemeProvider>
        </LanguageProvider>
    );
}
