import React, { useState, useRef, useEffect, useContext } from 'react';
import { Text, View, TextInput, Animated, Image, FlatList, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import getStyles from './HomeScreen.styles';
import { useTheme } from '../../hooks/useTheme';
import { darkTheme, lightTheme } from '../../hooks/theme';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { SurvivorContext } from '../../hooks/context/SurvivorContext';
import { Modal, Button } from 'react-native';  // Import other required components
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../../hooks/context/LanguageContext';
import translations from './translations.json';

const availableWidgets = [
    { id: '1', name: 'game', image: require('../../assets/game.jpeg'), screen: 'Game' },
    { id: '2', name: 'pomodoro', image: require('../../assets/pomodoro.jpeg'), screen: 'Pomodoro' },
    { id: '3', name: 'meteo', image: require('../../assets/meteo.png'), screen: 'Meteo' },
    { id: '4', name: 'chat', image: require('../../assets/chat.png'), screen: 'Chat' },
    { id: '5', name: 'calendar', image: require('../../assets/calendar.png'), screen: 'Calendar' },
    { id: '6', name: 'todolist', image: require('../../assets/todolist.png'), screen: 'ToDoList' },
    { id: '7', name: 'nasa', image: require('../../assets/nasa.png'), screen: 'Nasa' },
    { id: '8', name: 'github issues', image: require('../../assets/github.png'), screen: 'Github' },
    { id: '9', name: 'chat gpt', image: require('../../assets/ChatGPT.png'), screen: 'ChatGPT' },
    { id: '10', name: 'tree', image: require('../../assets/tree.png'), screen: 'Tree' },
    { id: '11', name: 'news', image: require('../../assets/news.png'), screen: 'News' },
    { id: '12', name: 'wikipedia', image: require('../../assets/wikipedia.jpg'), screen: 'Wikipedia' },
    { id: '13', name: 'quote', image: require('../../assets/quote.png'), screen: 'Quote' },
    { id: '14', name: 'music', image: require('../../assets/music.png'), screen: 'Music' },
    { id: '15', name: 'calculator', image: require('../../assets/calculator.png'), screen: 'Calculator' },
    { id: '16', name: 'notepad', image: require('../../assets/notepad.png'), screen: 'NotePad' },
    { id: '17', name: 'call', image: require('../../assets/video-call.png'), screen: 'Call' },
    { id: '18', name: 'discord', image: require('../../assets/discord.jpg'), screen: 'Discord' },
    { id: '19', name: 'youtube', image: require('../../assets/youtube.jpg'), screen: 'Youtube' },
    { id: '20', name: 'binance', image: require('../../assets/binance.png'), screen: 'Binance' },
    { id: '21', name: 'entreprises', image: require('../../assets/entreprise.jpg'), screen: 'Entreprise' },
    // { id: '21', name: 'twitch', image: require('../../assets/twitch.png'), screen: 'Twitch' },
    // ... Other widgets {DO NOT REMOVE THIS LINE}
];

const availableWidgetsNoWifi = [
    { id: '1', name: 'game', image: require('../../assets/game.jpeg'), screen: 'Game' },
    { id: '2', name: 'pomodoro', image: require('../../assets/pomodoro.jpeg'), screen: 'Pomodoro' },
    { id: '3', name: 'todolist', image: require('../../assets/todolist.png'), screen: 'ToDoList' },
    { id: '4', name: 'calculator', image: require('../../assets/calculator.png'), screen: 'Calculator' },
    { id: '5', name: 'notepad', image: require('../../assets/notepad.png'), screen: 'NotePad' },
    // ... Other Offline widgets {DO NOT REMOVE THIS LINE}
];

function HomeScreen() {
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme);
    const navigation = useNavigation();
    const survivorContext = useContext(SurvivorContext);
    const [selectedWidgets, setSelectedWidgets] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { language } = useLanguage();

    useEffect(() => {
        const fetchWidgets = async () => {
            const storedWidgets = await AsyncStorage.getItem('@selectedWidgets');
            if (storedWidgets) {
                setSelectedWidgets(JSON.parse(storedWidgets));
            }
        };
        fetchWidgets();
    }, []);

    useEffect(() => {
        // Save the current state of widgets to AsyncStorage whenever it changes
        AsyncStorage.setItem('@selectedWidgets', JSON.stringify(selectedWidgets));
    }, [selectedWidgets]);

    // Function to add a widget
    const addWidget = (widget) => {
        if (!selectedWidgets.find(w => w.id === widget.id)) {
            setSelectedWidgets(prevWidgets => [...prevWidgets, widget]);
        } else {
            Alert.alert(translations[language].widgetAlreadyAdded);
        }
    };

    const removeWidget = async (widgetId) => {
        const newWidgets = selectedWidgets.filter(widget => widget.id !== widgetId);
        setSelectedWidgets(newWidgets);
        await AsyncStorage.setItem('@selectedWidgets', JSON.stringify(newWidgets));
    };


    // The FlatList renderItem should be modified to accommodate the '+' widget
    const renderItem = ({ item }) => {
        if (item.id === 'add') {
            return (
                <TouchableOpacity style={styles.box} onPress={() => setIsModalVisible(true)}>
                    <Text style={styles.addWidgetText}>{translations[language].addWidgetText}</Text>
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity
                style={styles.box}
                onPress={() => navigation.navigate(item.screen)}
                onLongPress={() => {
                    // Confirm if the user really wants to remove the widget
                    Alert.alert(
                        translations[language].removeWidget,
                        translations[language].removeWidgetConfirmation,
                        [
                            {
                                text: translations[language].cancelText,
                                style: "cancel"
                            },
                            { text: translations[language].okText, onPress: () => removeWidget(item.id) }
                        ]
                    );
                }}
            >
                <Image source={item.image} style={styles.image} />
            </TouchableOpacity>
        );
    };

    const StyledButton = ({ title, onPress, style, image }) => {
        return (
            <TouchableOpacity style={[styles.defaultButton]} onPress={onPress}>
                <View style={[styles.rowContainer, style]}>
                    <Image source={image} style={styles.imagewidget} />
                    <Text style={[styles.buttonText]}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const StyledButton2 = ({ title, onPress, style }) => {
        return (
            <TouchableOpacity style={[styles.defaultButton]} onPress={onPress}>
                <View style={[styles.rowContainer, style]}>
                    <Text style={[styles.buttonText]}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    };

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
                <Text>{translations[language].loadingText}</Text>
            </View>
        );
    } else if (isWifi) {
        return (
            <View style={styles.container}>
                {console.log("email", survivorContext.email)}
                {console.log("password", survivorContext.password)}
                {!survivorContext.connected ? (
                    <View>
                        <ImageBackground
                            style={styles.imagebackground}
                            source={require("../../assets/logo_white.png")}
                            onError={(error) => {
                                console.log('Failed to load image:', error);
                            }}
                        >
                            <View style={styles.overlay}>
                                <Text style={styles.title} onPress={() => navigation.navigate('Login')}>{translations[language].login}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                ) : (
                    <View>
                        <FlatList
                            key={2}
                            data={[...selectedWidgets, { id: 'add' }]}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            numColumns={2}
                            scrollEnabled={true}
                        />
                        <Modal visible={isModalVisible} animationType="slide">
                            <FlatList
                                data={availableWidgets.filter(w => !selectedWidgets.some(sw => sw.id === w.id))}
                                renderItem={({ item }) => (
                                    <StyledButton
                                        title={`${translations[language].addWidgetTitle} ${item.name}`}
                                        onPress={() => addWidget(item)}
                                        style={styles.buttonwidget}
                                        image={item.image}
                                    />
                                )}
                                keyExtractor={(item) => item.id}
                                scrollEnabled={true}
                            />
                            <StyledButton2 title={translations[language].close} onPress={() => setIsModalVisible(false)} />
                        </Modal>
                    </View>
                )}
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{translations[language].offlineTitle}</Text>
                <View>
                    <FlatList
                        key={2}
                        data={[...selectedWidgets, { id: 'add' }]}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        scrollEnabled={true}
                    />
                    <Modal visible={isModalVisible} animationType="slide">
                        <FlatList
                            data={availableWidgetsNoWifi}
                            renderItem={({ item }) => (
                                <StyledButton
                                    title={`Add ${item.name}`}
                                    onPress={() => addWidget(item)}
                                    style={styles.buttonwidget}
                                    image={item.image}
                                />
                            )}
                            keyExtractor={(item) => item.id}
                            scrollEnabled={true}
                        />
                        <StyledButton2 title={translations[language].close} onPress={() => setIsModalVisible(false)} />
                    </Modal>
                </View>
            </View>
        );
    }
}

export default HomeScreen;
