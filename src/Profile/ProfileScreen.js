import React, { useEffect, useState, useContext } from 'react';
import { Text, View, Image, ImageBackground, Linking } from 'react-native';
import getStyles from './ProfileScreen.styles';
import { useTheme } from '../../hooks/useTheme';
import { darkTheme, lightTheme } from '../../hooks/theme';
import { getEmployee } from '../../constant/Firebase/podcastService';
import { SurvivorContext } from '../../hooks/context/SurvivorContext';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { createGroup } from '../../constant/Firebase/ChatService';
import { useNavigation } from "@react-navigation/native";
import Clipboard from '@react-native-clipboard/clipboard';
import { useLanguage } from '../../hooks/context/LanguageContext';
import translations from './translations.json';

function ProfileScreen({ route }) {
    console.log("ProfileScreen");
    const { me } = route.params;
    console.log(me);
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme);
    const currentDate = new Date();
    const navigation = useNavigation();
    const survivorContext = useContext(SurvivorContext);

    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const [employeeImage, setEmployeeImage] = useState(null);
    const [employee, setEmployee] = useState(null);
    const [myself, setMyself] = useState(null);

    const { language } = useLanguage();

    useEffect(() => {
        setMyself(survivorContext.me);
    }, []);

    useEffect(() => {
        //get from survivorContext.employeeDetails
        const fetchData = async () => {
            try {
                const employee = await getEmployee(me.id);
                setEmployee(employee);
                console.log("ok");
            } catch (error) {
                console.error('Error fetching employee:', error);
            }
        }
        fetchData().then(console.log("ok2"));
    }, []);

    const contactUser = async (employee) => {
        // Create the id
        let groupId = myself.id.toString() + "/" + employee.id.toString();
        const groupName = employee.name + " " + employee.surname;

        const firestoreId = await createGroup('Group', groupId, groupName);

        // If group didn't exist and was created, use the new Firestore ID as the groupId
        if (firestoreId) {
            groupId = firestoreId;
        }
        console.log("groupId: " + groupId);
        // Navigate to the chat
        navigation.navigate('DisplayChat', { groupId: groupId, groupName: groupName });
    };

    const copyToClipboard = () => {
        if (employee?.email) {
            console.log("copyToClipboard", employee.email);
            Clipboard.setString(employee.email);
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.cardImage}>
                <ImageBackground
                    style={styles.image}
                    source={{ uri: `data:image/png;base64,${me.image}` }}
                    onError={(error) => {
                        console.log('Failed to load image:', error);
                    }}
                >
                    <Text style={styles.overlay}>#{employee?.id}</Text>
                </ImageBackground>
            </View>
            <View style={styles.options}>
                {myself?.id !== employee?.id && <Icon name={'message'} size={20} color={theme.text} style={styles.option} onPress={() => contactUser(employee)} />}
                {/* TODO: replace for Group Icon */}
                {myself?.id !== employee?.id &&
                    <Icon
                        name={'envelope'}
                        size={20}
                        color={theme.text}
                        style={styles.option}
                        onPress={() => Linking.openURL('mailto:' + employee?.email)}
                    />
                }

            </View>
            <View style={styles.cardHeader}>
                <View style={styles.names}>
                    <View style={styles.column}>
                        <Text style={styles.name}>{translations[language].firstName}</Text>
                        <Text style={styles.responsename}>{employee?.name}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.name}>{translations[language].lastName}</Text>
                        <Text style={styles.responsename}>{employee?.surname}</Text>
                    </View>
                </View>
                <View style={styles.names}>
                    <View style={styles.emailColumn}>
                        <Text style={styles.name}>{translations[language].email}</Text>
                        <View style={styles.emailCopy}>
                            <Text style={styles.responsename}>{employee?.email}</Text>
                            <Icon name={'copy'} size={20} color={theme.text} style={styles.option} onPress={() => copyToClipboard()} />
                        </View>
                    </View>
                </View>
                <View style={styles.names}>
                    <View style={styles.column}>
                        <Text style={styles.name}>{translations[language].birthDate}</Text>
                        <Text style={styles.responsename}>{employee?.birth_date} {
                            employee?.birth_date &&
                                month === parseInt(employee.birth_date.split('-')[1]) &&
                                day === parseInt(employee.birth_date.split('-')[2])
                                ? '🎂'
                                : ''
                        }</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.name}>{translations[language].work}</Text>
                        <Text style={styles.responsename}>{employee?.work}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default ProfileScreen;
