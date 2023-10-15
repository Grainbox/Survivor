import { StyleSheet } from 'react-native';

const getStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        card: {
            width: '100%',
            height: '100%',
            backgroundColor: theme.background,
        },
        cardImage: {
            borderRadius: 15,
            marginBottom: 10,
            overflow: 'hidden',
        },
        image: {
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
            overflow: 'hidden',
            resizeMode: 'cover',
            alignSelf: 'center',
            margin: 10,
        },
        cardHeader: {
            top: 30,
            flex: 1,
            flexDirection: 'column',
            backgroundColor: theme.background,
        },
        // TODO: Fix the overlay box to be responsive to text inside
        overlay : {
            position: 'absolute',
            height: '20%',
            width: '25%',
            top: '80%',
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            textAlign: 'center',
            color: theme.background,
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderTopRightRadius: 5,
            padding: 2,
        },
        names: {
            flexDirection: 'row',
            alignSelf: 'stretch',
            padding: 10,
        },
        emailCopy: {
            flexDirection: 'row',
        },
        emailColumn: {
            flexDirection: 'column',
            alignItems: 'center',
        },
        column: {
            flexDirection: 'column',
            alignItems: 'center',
            width: '45%',
        },
        name: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.text,
            width: '100%',
            padding: 10,
            marginLeft: 60,
            alignSelf: 'stretch',
        },
        responsename: {
            fontSize: 20,
            color: theme.text,
            alignSelf: 'stretch',
            padding: 10,
            marginLeft: 60,
        },
        row: {
            flexDirection: 'row',
            width: '100%',
            padding: 10,
        },
        options : {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            top: 10,
            justifyContent: 'center',
            width: '100%',
        },
        option : {
            flexDirection: 'row',
            padding: 10,
            width: 'auto',
            backgroundColor: theme.background,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 1,
            shadowRadius: 5.46,
            elevation: 9,
            marginHorizontal: 10,
            borderRadius: 15,
        },
    });
};

export default getStyles;
