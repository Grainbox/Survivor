import { StyleSheet } from 'react-native';

const getStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: theme.background,
            alignItems: 'center',
        },
        noNotesTitle: {
            marginTop: 100,
            fontWeight: 'bold',
            color: theme.text,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
        },
        leftIcon: {
            padding: 10,
        },
        rightIcon: {
            padding: 10,
        },
        noteContainer: {
            marginTop: 20,
            justifyContent: 'space-around',
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        column: {
            minHeight: 50,
            padding: 10,
            borderColor: theme.text,
            borderRadius: 10,
            borderWidth: 1,
            margin: 5,
        },
    });
};

export default getStyles;
