import React, { useEffect, useState, useContext } from 'react';
import {
    FlatList, Text, View, TextInput,
    TouchableOpacity, Button, Image
} from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { darkTheme, lightTheme } from '../../../hooks/theme';
import { createGroup } from '../../../constant/Firebase/ChatService';
import { SurvivorContext } from '../../../hooks/context/SurvivorContext';
import getStyles from './CreateGroup.styles';
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from '../../../hooks/context/LanguageContext';
import translations from './translations.json';

function CreateGroupScreen() {
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme); // Assuming getStyles() is available or use your styles here
    const [employees, setEmployees] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [NameOfGroup, setNameOfGroup] = useState('');
    const navigation = useNavigation();
    const [me, setMe] = useState(null);
    const survivorContext = useContext(SurvivorContext);
    const { language } = useLanguage();

    useEffect(() => {
        setMe(survivorContext.me);
        setEmployees(survivorContext.employeeDetails);
    }, [survivorContext.employeeDetails]);

    const toggleUserSelection = (user) => {
        if (selectedUsers.some(u => u.id === user.id)) {
            setSelectedUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
        } else {
            setSelectedUsers(prevUsers => [...prevUsers, user]);
        }
    };

    const createGroupNav = () => {
        if (!NameOfGroup.trim()) {
            alert(translations[language].alertEnterGroupName);
            return;
        }
        //create string of id separated by a '/'
        let selectedUsersId = me?.id.toString() + '/';
        selectedUsers.forEach(user => {
            selectedUsersId += user.id + '/';
        });

        selectedUsersId = selectedUsersId.slice(0, -1);

        const id = createGroup('Group', selectedUsersId, NameOfGroup);
        // You can use the selectedUsers array to create the group
        console.log('Creating group with users:', id);
        navigation.navigate('DisplayChat', { groupId: id, groupName: NameOfGroup });
    };

    const filterUsersByName = () => {
        if (!searchTerm) return employees;
        return employees.filter(employee =>
            `${employee.name} ${employee.surname}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    return (
        <View style={styles.cont}>
            <TextInput
                value={searchTerm}
                placeholderTextColor="grey"
                onChangeText={setSearchTerm}
                placeholder={translations[language].searchUser}
                style={styles.input}
            />
            <TextInput
                value={NameOfGroup}
                placeholderTextColor="grey"
                onChangeText={setNameOfGroup}
                placeholder={translations[language].enterGroup}
                style={styles.input}
            />

            {/* List of Selected Users */}
            <FlatList
                data={selectedUsers}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.selectedUserContainer, // You need to style this
                        ]}
                        onPress={() => toggleUserSelection(item)} // Tap to remove
                    >
                        <Image
                            style={styles.listItemAvatar}
                            source={{ uri: `data:image/png;base64,${item.image}` }}
                        />
                        <Text style={styles.selectedUserName}>
                            {item.name} {item.surname},
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true} // Display them in a horizontal row. You can adjust this based on your UI.
                showsHorizontalScrollIndicator={false}
            />

            <FlatList
                data={filterUsersByName()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.userContainer,
                            selectedUsers.some(u => u.id === item.id) ? styles.selectedUser : {}
                        ]}
                        onPress={() => toggleUserSelection(item)}
                    >
                        <Image
                            style={styles.listItemAvatar}
                            source={{ uri: `data:image/png;base64,${item.image}` }}
                        />
                        <Text>{item.name} {item.surname}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            <Button title={translations[language].createGroup} onPress={createGroupNav} />
        </View>
    );
};

export default CreateGroupScreen;
