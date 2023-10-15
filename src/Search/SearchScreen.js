import React, {useEffect, useState, useContext} from 'react';
import {Text, View, Image, ImageBackground, TouchableOpacity, TextInput, FlatList} from 'react-native';
import getStyles from './SearchScreen.styles';
import { useTheme } from '../../hooks/useTheme';
import { darkTheme, lightTheme } from '../../hooks/theme';
import { SurvivorContext } from '../../hooks/context/SurvivorContext';
import {useNavigation} from "@react-navigation/native";
import { useLanguage } from '../../hooks/context/LanguageContext';
import translations from './translations.json';

function SearchScreen({ route }) {
    const navigation = useNavigation();
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme);
    const [employees, setEmployees] = useState(null);
    const [searchId, setSearchId] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const survivorContext = useContext(SurvivorContext);
    const { language } = useLanguage();

    useEffect(() => {
        setEmployees(survivorContext.employeeDetails);
    }, [survivorContext.employeeDetails]);

    useEffect(() => {
        if (searchId.trim() === '') {
            setFilteredEmployees([]);
        } else {
            if (employees) {  // Add this null check
                const result = employees.filter(employee =>
                    `${employee.name} ${employee.surname}`.toLowerCase().includes(searchId.toLowerCase())
                );
                setFilteredEmployees(result);
            }
        }
    }, [searchId, employees]);

    return (
        <View style={styles.cont}>
            <TextInput
                style={styles.input}
                placeholderTextColor="grey"
                placeholder={translations[language].searchForUser}
                value={searchId}
                onChangeText={setSearchId}
            />
            <FlatList
                data={filteredEmployees}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.listItemContainer}
                        onPress={() => navigation.navigate('Profile', { me: item })}
                    >
                        <Image
                            style={styles.listItemAvatar}
                            source={{ uri: `data:image/png;base64,${item.image}` }}
                        />
                        <Text style={styles.listItemText}>
                            {item.name} {item.surname}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default SearchScreen;
