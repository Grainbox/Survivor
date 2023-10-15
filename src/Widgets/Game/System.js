import { Engine, World, Bodies, Vector, Body } from "matter-js";
import {Dimensions, Alert} from "react-native";
import { Events } from "matter-js";
import { engine, world } from './GameScreen';

const { width, height } = Dimensions.get('window');

export const Physics = (entities, { time }) => {
    let engine = entities.physics.engine;
    Engine.update(engine, time.delta);
    return entities;
};

export const MoveBox = (entities, { touches }) => {
    const { box } = entities;

    touches.filter(t => t.type === "move").forEach(t => {
        box.body.position.x += t.delta.pageX;
    });

    return entities;
};

export const BallDrop = (entities) => {
    const { ball, box } = entities;
    const ballRadius = 15;  // ball radius which you used in the creation of the ball

    // Check for falling below screen
    if (ball.body.position.y > height) {
        console.log("Lose!");

        // Clear the world but keep static entities
        World.clear(world, true);

        const newBox = Bodies.rectangle(width / 2 - 25, 500, 50, 50, { isStatic: true});
        const newBall = Bodies.circle(width / 2, 30, ballRadius, { restitution: 0.8 });

        World.remove(world, [box.body, ball.body]);
        // Add the new bodies to the world
        World.add(world, [newBox, newBall]);

        entities.box.body = newBox;
        entities.ball.body = newBall;
        entities.score.value = 0;
    }

    return entities;
};

let eventListenerAttached = false;

export const BounceControl = (entities) => {
    if (!eventListenerAttached) {
        Events.on(engine, 'collisionStart', (event) => {
            const pairs = event.pairs;
            for (let i = 0; i < pairs.length; i++) {
                const { bodyA, bodyB } = pairs[i];

                if ((bodyA === entities.ball.body && bodyB === entities.box.body) ||
                    (bodyB === entities.ball.body && bodyA === entities.box.body)) {
                    console.log("Bounce!");
                    // Modify the bounce logic here if needed.
                    entities.score.value += 1;
                }
            }
        });
        eventListenerAttached = true;
    }
    return entities;
};





export default [Physics, MoveBox, BallDrop, BounceControl];
