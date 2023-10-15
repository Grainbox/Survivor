import { StyleSheet } from 'react-native';

const getStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        input: {
            backgroundColor: theme.background,
            color: theme.text,
            borderColor: theme.text,
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            margin: 10,
        },
        button : {
            backgroundColor: theme.text,
            color: theme.background,
            borderColor: theme.text,
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            margin: 10,
        },
        task: {
            backgroundColor: theme.background,
            color: theme.text,
            borderColor: theme.text,
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            margin: 10,
            flexDirection: 'row',
            alignItems: 'center',
        },
        text: {
            fontSize: 20,
            color: theme.text,
        },
    });
};

export default getStyles;
