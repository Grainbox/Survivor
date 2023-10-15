import { StyleSheet } from 'react-native';

const getStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: theme.background,
            color: theme.text,
        },
        timerText: {
            fontSize: 40,
            marginBottom: 0,
            fontWeight: 'bold',
            top: 80,
            color: theme.text,
        },
        buttonText: {
            fontSize: 20,
            color: theme.text,
        },
        button : {
            marginLeft: 20,
            padding: 50,
            shadowColor: theme.text,
            backgroundColor: theme.background,
            shadowOffset: {
                width: 1,
                height: 4,
            },
            shadowOpacity: 1,
            shadowRadius: 1,
            elevation: 10,
            top: '120%',
        },
        buttons : {
            flexDirection: 'row',
            alignItems: 'baseline',
            color: theme.text,
        },
        inputContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            color: theme.text,
        },
        input: {
            borderWidth: 1,
            fontSize: 30,
            borderColor: theme.text,
            width: 50,
            textAlign: 'center',
            color: theme.text,
            marginTop: '10%',
        },
        text2 : {
            color: theme.text,
            fontSize: 21,
            top: '1%',
            left: '-25%',
            position: 'absolute',
        },
        text3 : {
            color: theme.text,
            fontSize: 21,
            top: '1%',
            left: '22%',
            position: 'absolute',
        },
        line: {
            width: 1,
            height: '100%',
            backgroundColor: theme.text,
            marginLeft: 20,
            marginRight: 20,
        },
    });
};

export default getStyles;
