import { StyleSheet } from 'react-native';

const getStyles = (theme) => {
    return StyleSheet.create({
        weatherWidget: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        weatherDay: {
            flex: 1,
            borderColor: '#ddd',
            borderWidth: 1,
            padding: 10,
            alignItems: 'center',
        },
        dateText: {
            fontSize: 16,
            marginBottom: 10,
            color: theme.text,
        },
        weatherIcon: {
            width: 50,
            height: 50,
            marginBottom: 10,
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.text,
        },
        weatherText: {
            fontSize: 16,
            marginTop: 10,
            fontWeight: 'bold',
            color: theme.text,
        },
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        input : {
            backgroundColor: 'white',
            width : '80%',
            marginLeft: '10%',
            shadowColor: theme.text,
            shadowOffset: {
                width: 1,
                height: 4,
            },
            shadowOpacity: 1,
            shadowRadius: 1,
            elevation: 10,
            color: theme.text,
        },
        meteobox : {
            top : 50,
            marginLeft: 50,
        }
    });
};

export default getStyles;