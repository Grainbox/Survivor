import { StyleSheet } from 'react-native';

const getStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: theme.background,
        },
        item: {
            padding: 8,
            borderBottomWidth: 1,
            borderColor: '#ccc',
        },
    });
};

export default getStyles;
