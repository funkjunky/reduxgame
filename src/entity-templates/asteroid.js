import template_asteroid_piece from './asteroid-piece.js';
import { addScore } from '../actions/reducer.js';
import { destroyEntity, addAsteroidPiece } from '../actions/entities.js';

const template_asteroid = () => ({
    tags: ['asteroid', 'asteroid-shape-'+Math.floor(Math.random()*10)],
    size: 20,
    position: {
        x: 20 + Math.random() * (640 - 20),
        y: 20 + Math.random() * (480 - 20),
    },
    velocity: {
        x: (Math.random() - 0.5) * 50,
        y: (Math.random() - 0.5) * 50
    },
    friction: 0,
    lifetime: 0,
    rotationalVelocity: 0.001 - 0.002 * Math.random(),
    onCollision: [{
        tags: ['bullet', 'ship'],
        cb: (asteroid, victim, QueueAction) => {
            let peices = 3 + Math.random() * 4;
            for(let i=0; i < peices; ++i)
                QueueAction(addAsteroidPiece(asteroid.position, 1 + Math.ceil(asteroid.size / peices)));
            QueueAction(destroyEntity(asteroid.id));
            QueueAction(addScore(1));
        },
    }],
});

export default template_asteroid;
