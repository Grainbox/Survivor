import { StyleSheet } from 'react-native';

const getStyles = (theme) => {
    return StyleSheet.create({
        cont: {
            flex: 1,
            padding: 20,
            backgroundColor: theme.background,
        },
        input: {
            padding: 10,
            fontSize: 16,
            backgroundColor: '#F2F2F2',
            borderRadius: 5,
            marginBottom: 10,
        },
        listItemContainer: {
            flexDirection: 'row',
            padding: 10,
            backgroundColor: '#FFF',
            borderRadius: 5,
            marginBottom: 10,
            alignItems: 'center',
        },
        listItemAvatar: {
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 10,
            backgroundColor: '#E0E0E0',
        },
        listItemText: {
            fontSize: 16,
            fontWeight: '400',
        },
    });
};

export default getStyles;
