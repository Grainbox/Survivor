import { StyleSheet } from 'react-native';

const getStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: theme.background
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginVertical: 10,
            color: theme.text,
        },
        input: {
            height: 40,
            borderColor: 'grey',
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 8,
            color: theme.text,
        },
        resultItem: {
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
            padding: 10,
        },
        resultTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: 'blue',
            textDecorationLine: 'underline',
        },
        resultSnippet: {
            fontSize: 14,
            color: theme.text,
        },
    });
};

export default getStyles;
