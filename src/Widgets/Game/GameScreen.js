import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { Box, Ball, ScoreRender } from './Renders';
import { Physics, MoveBox, BallDrop, BounceControl } from './System';
import { Engine, World, Bodies } from 'matter-js';

const { width, height } = Dimensions.get('window');

const engine = Engine.create({ enableSleeping: false });

const world = engine.world;

const box = Bodies.rectangle(width / 2 - 25, 500, 50, 50, { isStatic: true});
const ball = Bodies.circle(width / 2, 30, 15, { restitution: 0.8 });


World.add(world, [box, ball]);

const entities = {
    physics: { engine: engine, world: world },
    box: { body: box, size: [50, 50], color: 'pink', renderer: Box },
    ball: { body: ball, size: [30, 30], color: 'blue', renderer: Ball },
    score: { value: 0, renderer: ScoreRender }
};

function GameScreen() {
    return (
        <GameEngine
            style={styles.container}
            systems={[Physics, MoveBox, BallDrop, BounceControl]}
            entities={entities}>
        </GameEngine>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
});

export { engine, world };
export default GameScreen;
