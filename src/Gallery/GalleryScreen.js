import React, { useEffect, useState, useContext } from 'react';
import {FlatList, Image, Text, View, TextInput, ImageBackground, TouchableOpacity} from 'react-native';
import getStyles from './GalleryScreen.styles';
import { useTheme } from '../../hooks/useTheme';
import { darkTheme, lightTheme } from '../../hooks/theme';
import {useNavigation} from "@react-navigation/native";
import { SurvivorContext } from '../../hooks/context/SurvivorContext';

function GalleryScreen() {
    const navigation = useNavigation();
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme);
    const [employees, setEmployees] = useState(null);
    const [searchId, setSearchId] = useState('');
    const survivorContext = useContext(SurvivorContext);

    useEffect(() => {
        setEmployees(survivorContext.employeeDetails);
    }, [survivorContext.employeeDetails]);

    const renderClientItem = ({ item }) => (
        <View style={styles.container}>
            <View style={styles.frame}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile', { me: item })}>
                    <ImageBackground
                        style={styles.image}
                        source={{ uri: `data:image/png;base64,${item.image}` }}
                        onError={(error) => {
                            console.log('Failed to load image:', error);
                        }}
                    >
                        <View style={styles.overlay}>
                            <Text style={styles.label}>{item.name} {item.surname}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        </View>
    );


    return (<>
        <View style={styles.cont}>
            <FlatList
                data={ employees }
                renderItem={renderClientItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal={false}
                numColumns={3}
            />
        </View>
    </>);
};

export default GalleryScreen;
