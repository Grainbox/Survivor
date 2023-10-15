import React, {useContext, useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import {addMessageToGroup, removeOfGroup, getGroups} from '../../../constant/Firebase/ChatService';
import {useTheme} from "../../../hooks/useTheme";
import {darkTheme, lightTheme} from "../../../hooks/theme";
import getStyles from "./ChatScreen.styles";
import {SurvivorContext} from "../../../hooks/context/SurvivorContext";
import Icon from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from '@react-navigation/native';
import { useLanguage } from '../../../hooks/context/LanguageContext';
import translations from './translations.json';

const ChatListScreen = ({ navigation }) => {
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme);
    const [chatList, setChatList] = useState([]);
    const survivorContext = useContext(SurvivorContext);
    const [me, setMe] = useState(null)
    const isFocused = useIsFocused();
    const { language } = useLanguage();

    useEffect(() => {
        const fetchMe = async () => {
            setMe(survivorContext.me);
            console.log("me", me);
            const chatListData = await getGroups('Group', survivorContext.me.id);
            console.log("chatListData", chatListData);
            setChatList(chatListData);  // Here you're setting chatList with chatListData

        };

        if (isFocused) {
            const intervalId = setInterval(fetchMe, 1000);
            return () => clearInterval(intervalId);
        }
    }, [isFocused]);
    const removeChatList = async (chatItem) => {
        console.log(chatItem.documentId);
        // Remove the chat conversation from the list
        const newList = chatList.filter((item) => item.documentId !== chatItem.documentId);
        setChatList(newList);

        await removeOfGroup('Group', chatItem.documentId, me.id);
        await sendLeaveChatMessage(chatItem.documentId);
    }

    const sendLeaveChatMessage = async (groupId) => {
        const messageData = {
            _id: Math.random().toString(36).substring(7),
            createdAt: new Date().toISOString(),
            text: me?.name + translations[language].leftTheChat,
            user: {
                _id: me?.id,
                name: me?.name,
            }
        };
        await addMessageToGroup('Group', groupId, messageData);
    };



    return (
        <View style={{
            flex: 1,
            backgroundColor: theme.background,
            flexDirection: 'column',
            padding: 10,
            width: '100%',
            alignContent: 'center',
            justifyContent: 'center',
        }}>
            <View style={{
                flexDirection: 'row',  // This will place the Text and Icon side by side.
                justifyContent: 'space-between', // To place elements on either end.
                alignItems: 'center', // To vertically center them.
                marginBottom: 15, // To give some space before the FlatList
            }}>
                <Text style={{ color: theme.text, fontSize : 20, fontWeight : 'bold'}}>{translations[language].yourConversations}</Text>
                <Icon
                    name={'plus-circle'}
                    size={30}
                    color={theme.text}
                    onPress={() => navigation.navigate('CreateGroup')}
                />
            </View>
            <FlatList
                data={chatList}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            // Navigate to the chat screen with the selected chat ID
                            navigation.navigate('DisplayChat', { groupId: item.documentId, groupName: item?.namegroup });
                        }}
                        onLongPress={() => {
                            Alert.alert(
                                translations[language].removeGroup,
                                translations[language].doYouWantToRemove,
                                [
                                    {
                                        text: translations[language].cancel,
                                        style: "cancel"
                                    },
                                    { text: translations[language].ok, onPress: () => removeChatList(item) }
                                ]
                            );
                        }}
                    >
                        <Text style={{
                            color: theme.text,
                            backgroundColor: theme.background,
                            shadowColor: theme.text,
                            shadowOffset: { width: 0, height: 5 },
                            shadowOpacity: 1,
                            shadowRadius: 10,
                            elevation: 5,
                            borderRadius: 10,
                            margin: 10,
                            fontSize: 20,
                            fontWeight: 'bold',
                            padding: 10,
                        }}>{item?.namegroup}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item?.documentId}
            />
        </View>
    );
};

export default ChatListScreen;
