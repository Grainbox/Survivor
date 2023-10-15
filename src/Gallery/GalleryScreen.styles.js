import { StyleSheet } from 'react-native';

const getStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: theme.background,
            marginLeft: 7,
            marginTop: 5,
        },
        cont : {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: theme.background,
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
            fontSize: 12,
            fontWeight: '600',
            color: 'white',
            padding: 5,
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
            width: 125,
            height: 125,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 9,
            borderRadius: 15,
            marginBottom: 10,
            overflow: 'hidden',
        },
        image: {
            width: '100%', // subtracting the borderWidth (2 times 10)
            height: '100%', // subtracting the borderWidth (2 times 10)
        },
        overlay : {
            position: 'absolute',
            height: '20%',
            top: '80%',
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'baseline',
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 5,
        },
    });
};

export default getStyles;
