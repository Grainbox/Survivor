import { StyleSheet } from 'react-native';

export const getStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        calculator: {
            flex: 1,
        },
        textView: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.background,
        },
        text: {
            color: theme.text,
            fontSize: 25,
            fontWeight: 'bold',
            margin: 10,
        },
    });
};

export default getStyles;
