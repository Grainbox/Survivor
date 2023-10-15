import { StyleSheet } from 'react-native';

const getStyles = (theme) => {
    return StyleSheet.create({
        cont: {
            flex: 1,
            padding: 10,
            backgroundColor: theme.background,
        },
        input: {
            padding: 10,
            borderRadius: 5,
            backgroundColor: 'white',
            borderColor: theme.text,
            borderWidth: 1,
            marginBottom: 10,
            color: theme.background
        },
        userContainer: {
            flexDirection: 'row',
            padding: 10,
            borderWidth: 1,
            borderColor: theme.text,
            borderRadius: 5,
            marginBottom: 10,
            alignItems: 'center'
        },
        selectedUser: {
            backgroundColor: theme.primaryColor, // Or any color to indicate selection
        },
        selectedUserContainer : {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 20,
            borderRadius: 5,
            height: 60,
            backgroundColor: 'white',
            borderColor: theme.text,
            borderWidth: 1,
            marginBottom: 30,
            color: theme.text
        },
        selectedUserName : {
            color: theme.text,
            fontWeight: 'bold',
            marginLeft: 10
        },
        listItemContainer: {
            flexDirection: 'row',
            padding: 10,
            backgroundColor: theme.background,
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
            color: theme.text,
        },
    });
};

export default getStyles;
