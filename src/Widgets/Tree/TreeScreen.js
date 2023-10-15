import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import EmployeeTree from './EmployeeTree';
import { SurvivorContext } from '../../../hooks/context/SurvivorContext';

const TreeScreen = () => {
    const survivorContext = useContext(SurvivorContext);

    const topLevelEmployee = survivorContext.employeeDetails ? survivorContext.employeeDetails.find(e => e.id === 1) : null;

    return (
        <ScrollView contentContainerStyle={styles.container} horizontal={true}>
            {topLevelEmployee && <EmployeeTree employee={topLevelEmployee} allEmployees={survivorContext.employeeDetails} />}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        flexGrow: 1, // Ensure the content can grow within the ScrollView
    },
});

export default TreeScreen;
