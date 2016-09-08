import template_asteroid from './asteroid.js';
import { destroyEntity } from '../actions/entities.js';
import { addScore } from '../actions/reducer.js';

const template_asteroid_piece = () => {
    let template = template_asteroid();
    template.tags.push('asteroid-shape-' + Math.floor(Math.random()*10));
    template.velocity.x *= 2;
    template.velocity.y *= 2;
    template.rotationalVelocity *= 2;
    template.onCollision.push({
        tags: ['bullet', 'ship'],
        cb: (asteroid, victim, QueueAction) => { 
            QueueAction(destroyEntity(asteroid.id));
            QueueAction(addScore(2));
        },
    });

    return template;
};

export default template_asteroid_piece;
