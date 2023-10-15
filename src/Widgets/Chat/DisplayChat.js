import React, { useEffect, useState, useContext } from 'react';
import { View, Alert } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { getMessageFromGroup, addMessageToGroup, deleteMessageFromGroup } from '../../../constant/Firebase/ChatService'; // Import Firestore functions
import { SurvivorContext } from '../../../hooks/context/SurvivorContext';
import {useTheme} from "../../../hooks/useTheme";
import {darkTheme, lightTheme} from "../../../hooks/theme";
import { useLanguage } from '../../../hooks/context/LanguageContext';
import translations from './translations.json';

const DisplayChat = ({ route }) => {
    const { groupId } = route.params;
    const [messages, setMessages] = useState([]);
    const survivorContext = useContext(SurvivorContext);
    const [me, setMe] = useState(null);
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const { language } = useLanguage();

    useEffect(() => {
        console.log("me from context:", survivorContext.me);
        setMe(survivorContext.me);
    }, []);


    useEffect(() => {
        // Fetch the messages for the selected group (groupId)
        const fetchMessages = async () => {
            const groupMessages = await getMessageFromGroup('Group', groupId);
            // Convert messages to the format expected by GiftedChat
            const formattedMessages = groupMessages.map((message) => ({
                _id: message._id,
                createdAt: new Date(message.createdAt),
                text: message.text,
                user: {
                    _id: message.user._id,
                    name: message.user.name,
                },
            }));
            //reverse the array to display the last message first
            formattedMessages.reverse();
            setMessages(formattedMessages);
        };

        const intervalId = setInterval(fetchMessages, 1000);
        return () => clearInterval(intervalId);
    }, [groupId]);

    const onMessageLongPress = async (context, currentMessage) => {
        // Check if the logged-in user is the sender of the message
        if (currentMessage.user._id === me.id) {
            Alert.alert(
                translations[language].deleteMessage,
                translations[language].validDeleteMessage,
                [
                    { text: translations[language].cancel, style: "cancel" },
                    { text: translations[language].delete, onPress: () => handleDeleteMessage(currentMessage._id) }
                ]
            );
        }
    };

    const sendMessageToFirebase = async (newMessages) => {
        const newMessage = newMessages[0];
        const messageData = {
            _id: Math.random().toString(36).substring(7),
            createdAt: newMessage.createdAt.toISOString(),
            text: newMessage.text,
            user : {
                _id: me.id,
                name: me.name,
            }
        };
        console.log("group id", groupId);
        console.log("message data", messageData);
        try {
            {
                groupId._j ?
                await addMessageToGroup('Group', groupId._j, messageData)
                :
                await addMessageToGroup('Group', groupId, messageData)
            }

            setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleDeleteMessage = async (messageId) => {
        // Delete from Firebase
        await deleteMessageFromGroup('Group', groupId, messageId);

        // Delete from local state
        setMessages((previousMessages) => previousMessages.filter(message => message._id !== messageId));
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.background}}>
            <GiftedChat
                messages={messages}
                onSend={sendMessageToFirebase}
                renderBubble={(props) => (
                    <Bubble
                        {...props}
                        wrapperStyle={{
                            left: { backgroundColor: '#f0f0f0' }, // Bubble color for messages from other users
                            right: { backgroundColor: '#0084ff' }, // Bubble color for messages from the logged-in user
                        }}
                    />
                )}
                user={{
                    _id: me?.id,
                    name: me?.name,
                }}
                onLongPress={(context, currentMessage) => onMessageLongPress(context, currentMessage)}
            />
        </View>
    );
};

export default DisplayChat;
