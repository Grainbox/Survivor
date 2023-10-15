import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import {useNavigation} from "@react-navigation/native";

const EmployeeTree = ({ employee, allEmployees }) => {
    const navigation = useNavigation();
    const renderSubordinates = (subordinates) => {
        if (!subordinates || subordinates.length === 0) return null;

        return (
            <View style={styles.subordinates}>
                {subordinates.map(subordinateId => {
                    const subordinate = allEmployees.find(e => e.id === subordinateId);
                    if (!subordinate) return null;

                    return (
                        <View key={subordinate.id} style={styles.connectingLine}>
                            <View style={styles.connector} />
                            <EmployeeTree employee={subordinate} allEmployees={allEmployees} />
                        </View>
                    );
                })}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.employee}>
                <ImageBackground
                    source={{ uri: `data:image/png;base64,${employee.image}` }}
                    style={styles.imageBackground}
                    imageStyle={{ borderRadius: 47 }}
                >
                    <Text style={styles.employeeName} onPress={() => navigation.navigate('Profile', { me: employee })}>{employee.name}</Text>
                    <Text style={styles.employeeWork} onPress={() => navigation.navigate('Profile', { me: employee })}>{employee.work}</Text>
                </ImageBackground>
            </View>
            {renderSubordinates(employee.subordinates)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        flexDirection: 'column', // Set the default flexDirection to column
        alignItems: 'center', // Center the main container
    },
    employee: {
        marginBottom: 100, // Adjust the marginBottom here for more space
        flexDirection: 'row', // Set flexDirection to row for employees
    },
    imageBackground: {
        width: 94,
        height: 94,
        alignItems: 'center',
        justifyContent: 'center',
    },
    employeeName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    employeeWork: {
        fontSize: 12,
        color: 'white',
    },
    subordinates: {
        flexDirection: 'row', // Set flexDirection to row for subordinates
        justifyContent: 'space-between', // Add spacing between subordinates
        alignItems: 'center', // Center subordinates vertically
    },
    connectingLine: {
        flexDirection: 'column', // Set flexDirection to column for connecting line
        alignItems: 'center',
        justifyContent: 'center',
    },
    connector: {
        width: 1,
        height: 40, // Adjust the line height as needed
        backgroundColor: 'black',
    },
});

export default EmployeeTree;
