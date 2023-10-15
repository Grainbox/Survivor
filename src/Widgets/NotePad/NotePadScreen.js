import React, { useEffect, useState } from 'react';
import { Alert, Modal, Pressable, View } from "react-native";
import getStyles from "./NotePadScreen.style";
import { useTheme } from "../../../hooks/useTheme";
import { darkTheme, lightTheme } from "../../../hooks/theme";
import { retrieveData, storeData } from "../../../constant/Firebase/podcastService";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'react-native-elements';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useLanguage } from '../../../hooks/context/LanguageContext';
import translations from './translations.json';

function ItemDetailsModal({ isVisible, item, onClose, onChangeText, onDelete, deleteNote, selectedIndex }) {
    const [text, setText] = useState(item);
    const [title, setTitle] = useState(item ? item.titre : "");
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme);
    const { language } = useLanguage();

    useEffect(() => {
        setText(item ? item.contenu : "");
        setTitle(item ? item.titre : "");
    }, [item]);

    const handleTextChange = (newText) => {
        setText(newText);
        onChangeText(newText, title);
    };

    const handleTitleChange = (newTitle) => {
        setTitle(newTitle);
        onChangeText(text, newTitle);
    };

    const handleOnClose = () => {
        if (title.trim() === "Nouveau titre" && text.trim() === "") {
            onDelete();
        }
        onClose();
    };

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => onClose()}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Pressable onPress={() => handleOnClose()} style={styles.leftIcon}>
                        <Icon name="arrow-left" size={30} color={theme.text} />
                    </Pressable>
                    <Pressable onPress={() => onDelete()} style={styles.rightIcon}>
                        <Icon name="trash" size={30} color={theme.text} />
                    </Pressable>
                </View>
                <TextInput
                    onChangeText={newTitle => handleTitleChange(newTitle)}
                    value={title}
                    placeholder='Enter Title...'
                    placeholderTextColor={theme.text}
                    style={{ color: theme.text }}
                />
                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={newText => handleTextChange(newText)}
                    value={text}
                    placeholder={translations[language].placeholder}
                    placeholderTextColor={theme.text}
                    style={{ color: theme.text }}
                />
            </View>
        </Modal>

    );
}


export default function NotePadScreen() {
    const [data, setData] = useState([]);
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme);
    const [refreshFlag, setRefreshFlag] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const cacheKey = "NotePad";
    const { language } = useLanguage();

    async function fetchData() {
        try {
            const retrievedData = await retrieveData(cacheKey);
            if (retrievedData !== null) {
                const parsedData = JSON.parse(retrievedData);
                setData(parsedData);
            } else {
                setData([]);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération ou du parsing des données :", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    function addNewNote() {
        const newData = [...data, { titre: translations[language].newTitle, contenu: "" }];
        setData(newData);
        storeData(cacheKey, JSON.stringify(newData));
    }

    function onChangeNote(newText, newTitle) {
        const newData = [...data];
        newData[selectedIndex].contenu = newText;
        newData[selectedIndex].titre = newTitle;
        setData(newData);
        storeData(cacheKey, JSON.stringify(newData));
    }

    function deleteNote() {
        const newData = [...data];

        newData.splice(selectedIndex, 1);
        setData(newData);
        storeData(cacheKey, JSON.stringify(newData));
        setShowModal(false);
    };

    function handlePressItem(contenu, titre, index) {
        setSelectedIndex(index);
        setSelectedItem({ contenu, titre });
        setShowModal(true);
    }

    function deleteNoteByIndex(index) {
        Alert.alert(
            translations[language].alertTitle,
            translations[language].alertContent,
            [
                {
                    text: translations[language].cancelButton,
                    style: 'cancel',
                },
                {
                    text: translations[language].confirmButton,
                    onPress: () => {
                        const newData = [...data];
                        newData.splice(index, 1);
                        setData(newData);
                        storeData(cacheKey, JSON.stringify(newData));
                    }
                },
            ],
            { cancelable: false }
        );
    }

    if (data.length == 0) {
        return (
            <View style={styles.container}>
                <Pressable onPress={addNewNote}>
                    <Icon name="plus" size={30} color={theme.text} />
                </Pressable>
                <Text style={styles.noNotesTitle}>{translations[language].emptyNotes}</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Pressable onPress={addNewNote}>
                    <Icon name="plus" size={30} color={theme.text} />
                </Pressable>
                <ScrollView
                    key={refreshFlag}
                    contentContainerStyle={styles.noteContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {data.map((note, index) => (
                        <Pressable
                            style={styles.column}
                            onPress={() => handlePressItem(note.contenu, note.titre, index)}
                            key={index}
                            onLongPress={() => deleteNoteByIndex(index)}
                        >
                            <Text style={{ color: theme.text }}>{note.titre}</Text>
                        </Pressable>
                    ))}
                </ScrollView>
                <ItemDetailsModal
                    key={selectedIndex}
                    isVisible={showModal}
                    item={selectedItem}
                    onClose={() => setShowModal(false)}
                    onChangeText={onChangeNote}
                    onDelete={deleteNote}
                    deleteNote={() => deleteNoteByIndex(selectedIndex)}
                    selectedIndex={selectedIndex}
                />
            </View>
        );
    }
}
