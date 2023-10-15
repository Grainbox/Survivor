import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useTheme} from "../../../hooks/useTheme";
import {darkTheme, lightTheme} from "../../../hooks/theme";
import getStyles from "./ToDoList.styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../../../hooks/context/LanguageContext';
import translations from './translations.json';

const ToDoListScreen = () => {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState('');
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme);
    const { language } = useLanguage();

    useEffect(() => {
        const loadTasks = async () => {
            const savedTasks = await AsyncStorage.getItem('tasks');
            if (savedTasks) {
                setTasks(JSON.parse(savedTasks));
            }
        };
        loadTasks();
    }, []);

    const handleAddTask = () => {
        if (currentTask) {
            const newTasks = [...tasks, { id: Math.random().toString(), title: currentTask, completed: false }];
            setTasks(newTasks);
            setCurrentTask('');

            // Save to AsyncStorage
            AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
        }
    };

    const handleTaskToggle = (itemId) => {
        const updatedTasks = tasks.map(task =>
            task.id === itemId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);

        // Save to AsyncStorage
        AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const removeTask = (itemId) => {
        const updatedTasks = tasks.filter(task => task.id !== itemId);
        setTasks(updatedTasks);

        // Save to AsyncStorage
        AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    return (
        <View style={styles.container}>
            {/* Input for new task */}
            <TextInput
                value={currentTask}
                placeholderTextColor="grey"
                onChangeText={(text) => setCurrentTask(text)}
                placeholder={translations[language].newTask}
                style={styles.input}
            />
            <Button
                style={styles.button}
                title={translations[language].addTask}
                onPress={handleAddTask}
            />

            {/* List of tasks */}
            <FlatList
                data={tasks}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => handleTaskToggle(item.id)}
                        onLongPress={() => {
                            Alert.alert(
                                translations[language].alertTitle,
                                translations[language].alertContent,
                                [
                                    {
                                        text: translations[language].cancelButton,
                                        style: translations[language].cancelButton
                                    },
                                    { text: translations[language].confirmButton, onPress: () => removeTask(item.id) }
                                ]
                            );
                        }}
                    >
                    <View style={styles.task}>
                            <Text style={styles.text}>{item.completed ? '✓' : '[ ]'}</Text>
                            <Text style={{ color:theme.text, textDecorationLine: item.completed ? 'line-through' : 'none', fontSize: 20, marginLeft: 20, overflow: 'hidden' }}>{item.title}</Text>
                    </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

export default ToDoListScreen;
