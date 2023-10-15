import { StyleSheet } from 'react-native';

const getStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
            alignItems: 'center',
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
        albumCover: {
            top: '30%',
            width: 250,
            height: 250,
            shadowColor: theme.text,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 5,
            elevation: 4,
            borderRadius: 5,
            borderColor: theme.text,
        },
        textInfo: {
            color: 'white',
        },
        link: {
            color: 'blue'
        },
        text : {
            color: theme.text,
            fontSize: 20,
            fontWeight: 'bold',
            alignSelf: 'center',
        },
        infos : {
            flexDirection: 'row',
            alignItems: 'flex-end',
            position: 'absolute',
            height: '25%',
            width: 250,
            top: '75%',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderTopRightRadius: 5,
            padding: 2,
        }
    });
};

export default getStyles;
