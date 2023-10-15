import { StyleSheet } from 'react-native';

const getStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: theme.backgroundColor,
            top: 90,
            marginLeft: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 15,
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
        frame: {
            width: 275,
            height: 300,
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
            margin: 10,
        },
        secondframe: {
            top: 50,
            width: 275,
            height: 100,
            borderBottomWidth: 10,
            borderLeftWidth: 10,
            borderRightWidth: 10,
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
            margin: 10,
        },
        image: {
            width: 180, // subtracting the borderWidth (2 times 10)
            height: 280, // subtracting the borderWidth (2 times 10)
            borderRadius: 10,
        },
    });
};

export default getStyles;
