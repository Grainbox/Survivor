import { StyleSheet } from 'react-native';

const getStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.background,
        },
        title: {
            flex: 0.5,
            fontSize: 70,
            fontWeight: 'bold',
            marginTop: 0,
            color: theme.text,
        },
        infoContainer: {
            marginBottom: 0,
        },
        label: {
            fontSize: 16,
            fontWeight: '600',
        },
        value: {
            fontSize: 14,
            color: theme.text,
            marginLeft: 10,
        },
        clientContainer: {
            padding: 16,
            borderBottomWidth: 1,
            borderColor: '#eee'
        },
        frame: {
            flex: 1,
            marginVertical: 50,
            marginHorizontal: 100,
            borderColor: '#3E3E3E',
            borderWidth: 10,
            borderRadius: 15,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 9,
            alignItems: 'center',
            justifyContent: 'center',
        },
        image: {
            width: 180, // subtracting the borderWidth (2 times 10)
            height: 280, // subtracting the borderWidth (2 times 10)
            borderRadius: 10,
        },
        login: {
            backgroundColor: theme.text,
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderTopWidth: 0.4,
            height: 70,  // or whatever the height of your TextInput is
            borderBottomEndRadius: 1,
            borderBottomStartRadius: 1,
            borderBottomWidth: 0,  // Remove the borderBottomWidth
        },
        input: {
            height: '100%',
            padding: 10,
            color: theme.text,
        },
        boat: {
            height: 50, // Adjust according to your boat's size
            width: 50,  // Adjust according to your boat's size
            top: 7,
        },
        waveBorder: {
            height: 20,
            width: '50%',
        },
        inputBox: {
            width: '80%',
            borderStyle: 'solid',
            borderWidth: 5,
            overflow: 'hidden',
            marginBottom: 100,
        },
        button: {
            backgroundColor: 'grey',
            color: theme.text,
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            padding: 10,
            width: '80%',
            fontSize: 20,
        },
    });
};

export default getStyles;
