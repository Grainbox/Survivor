import { StyleSheet } from 'react-native';

const getStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: theme.background,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 10,
            color: '#FFA500', // Orange color
            textAlign: 'center',
        },
        image: {
            width: '100%',
            height: 300,
            borderRadius: 15, // Adds some rounded corners
            marginBottom: 20,
            shadowColor: "#FFF",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
        },
        description: {
            fontSize: 16,
            color: theme.text,
            textAlign: 'justify',
            lineHeight: 24, // Increased for better readability
        },
    });
};

export default getStyles;
