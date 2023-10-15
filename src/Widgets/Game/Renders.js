import React from 'react';
import { View, Text } from 'react-native';

export const Box = (props) => {
    const { body } = props;
    const { position } = body;

    return (
        <View style={[styles.box, { left: position.x, top: position.y }]} />
    );
};

export const Ball = (props) => {
    const { body } = props;
    const { position } = body;

    return (
        <View style={[styles.ball, { left: position.x, top: position.y }]} />
    );
};

export const ScoreRender = (props) => {
    return (
        <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>Score: {props.value}</Text>
        </View>
    );
};

const styles = {
    box: {
        position: 'absolute',
        width: 50,
        height: 20,
        backgroundColor: 'pink'
    },
    ball: {
        position: 'absolute',
        width: 30,
        height: 30,
        backgroundColor: 'blue',
        borderRadius: 15
    },
    scoreContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    scoreText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    }
};

export default { Box, Ball };
