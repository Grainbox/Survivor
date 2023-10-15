import { StyleSheet } from 'react-native';

const getStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        title: {
            fontSize: 50,
            fontWeight: 'bold',
            color: theme.text,
            alignSelf: 'center',
            backgroundColor: theme.background,
            borderRadius: 20,
            padding: 10,
        },
        infoContainer: {
            marginBottom: 10,
        },
        label: {
            fontSize: 16,
            fontWeight: '600',
        },
        value: {
            fontSize: 14,
            color: 'grey',
            marginLeft: 10,
        },
        clientContainer: {
            padding: 16,
            borderBottomWidth: 1,
            borderColor: '#eee'
        },
        image: {
            width: '100%', // subtracting the borderWidth (2 times 10)
            height: '100%', // subtracting the borderWidth (2 times 10)
            resizeMode: 'contain',
            borderRadius: 10,
        },
        login: {
            backgroundColor: '#3E3E3E',
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        signin: {
            backgroundColor: '#3E3E3E',
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        logintext: {
            fontSize: 50,
            fontWeight: 'bold',
            marginBottom: 15,
            color: '#fff',
        },
        signintext: {
            fontSize: 50,
            fontWeight: 'bold',
            marginBottom: 15,
            color: '#fff',
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
            flex: 1,
            height: '100%',
            padding: 10,
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
        },
        overlay : {
            position: 'absolute',
            height: '100%',
            width: '100%',
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'baseline',
            color: theme.background,
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: 5,
        },
        imagebackground : {
            width: '100%', // subtracting the borderWidth (2 times 10)
            height: '100%', // subtracting the borderWidth (2 times 10)
            resizeMode: 'contain',
        },
        box: {
            margin: 10,
            marginTop: 25,
            width: 180,
            height: 100,
            borderRadius: 8,
            overflow: 'hidden',
            shadowColor: theme.text,
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 1,
            shadowRadius: 2,
            elevation: 2,
        },
        addWidgetText: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.text,
            flex: 1,
            textAlign: 'center',
            textAlignVertical: 'center',
        },
        defaultButton: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            margin: 10,
            backgroundColor: theme.background,
            shadowColor: theme.text,
            shadowOffset: {
                width: 1,
                height: 4,
            },
            shadowOpacity: 1,
            shadowRadius: 1,
            elevation: 4,
        },
        buttonText: {
            color: theme.text,
            fontSize: 30,
            fontWeight: 'bold',
        },
        buttonwidgetcolor : {
            color : 'black',
        },
        buttonwidget : {
            padding: 20,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        rowContainer: {
            flexDirection: 'row',    // <-- Sets direction of flex children to row
            alignItems: 'center',    // Vertically centers children
        },
        imagewidget: {
            marginRight: 10,          // Adds some space between image and the following text
            width: 70,                // Adjust according to your boat's size
            height: 70,               // Adjust according to your boat's size
            borderRadius: 8,          // Rounded border
            // ... your other image styles
        },
    });
};

export default getStyles;
