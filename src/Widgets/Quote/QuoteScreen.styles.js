import { StyleSheet } from 'react-native';

const getStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.background,
            padding: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 16,
            color: theme.text,
        },
        quoteContainer: {
            backgroundColor: theme.background,
            borderRadius: 8,
            padding: 16,
            elevation: 4,
        },
        quoteText: {
            fontSize: 18,
            textAlign: 'center',
            marginBottom: 8,
            color: theme.text,
        },
        authorText: {
            fontSize: 16,
            textAlign: 'right',
            color: '#777',
        },
        error: {
            fontSize: 18,
            color: 'red',
            textAlign: 'center',
        },
    });
};

export default getStyles;
