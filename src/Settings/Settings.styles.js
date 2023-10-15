import { StyleSheet } from 'react-native';

const getStyles = (theme) => {
    return StyleSheet.create({
        // Your styles here, with theme applied
        container: {
            backgroundColor: theme.background,
            flex: 1,
        },
        title: {
            color: theme.text,
        },
        header: {
            backgroundColor: theme.background,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 15,
            borderColor: theme.text,
            borderWidth: 0.2,
        },
        rights: {
            color: theme.text,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: 15,
            bottom: 30,
        },
        rightText: {
            color: theme.text,
            fontSize: 13,
            bottom: 15,
            padding: 5,
        },
        text: {
            color: theme.text,
            fontSize: 18,
            padding: 10,
        },
        bold : {
            color: theme.text,
            fontWeight: "bold",
            fontSize: 18,
            textDecorationLine: 'underline',
            marginBottom: 10,
        },
        input: {
            color: theme.text,
            width: '80%',
            padding: 10,
            borderColor: theme.text,
            borderWidth: 0.5,
            borderRadius: 50,
            paddingHorizontal: 15,
        },
        sendButton: {
            backgroundColor: theme.AppButton,
            color: theme.text,
            borderColor: theme.text,
            borderWidth: 1,
            borderRadius: 50,
            padding: 10,
        },
        cgu: {
            color: theme.text,
            fontSize: 12,
            padding: 10,
            position: 'absolute',
            bottom: 0,
            textAlign: 'center',
            width: '100%',
        },
        languageSelector: {
            fontSize: 14,
            color: theme.text,
        },
    });
};

export default getStyles;
