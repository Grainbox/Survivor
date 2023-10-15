import { StyleSheet } from 'react-native';

const getStyles = (theme) => {
    return StyleSheet.create({
        icon: {
            size : 20,
        },
        header: {
            backgroundColor: theme.background,
            flex: 1,
            flexDirection: 'column',
            marginTop: 5,
        },
        tabBar: {
            backgroundColor: theme.background,
            //borderColor: theme.background,
            borderTopColor: theme.text,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            height: 60,
        },
        headerTitle: {
            color: theme.text,
            fontSize: 24,
            fontWeight: 'bold',
        },
        logo: {
            width: 70,
            height: 70,
            borderRadius: 50,
            overflow: 'hidden',
        },
        imageLogo: {
            width: '100%',
            height: '100%',
        },
        gearsIcon: {
            color: theme.text,
        },
        headerLine: {
            flex: 1,
            backgroundColor: theme.background,
            height: 20,
            marginLeft: -20,
            marginRight: -20,
        }
    });
};

export default getStyles;
