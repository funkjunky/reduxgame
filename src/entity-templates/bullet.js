import normalizeVector from '../helpers/normalizevector.js';
import { destroyEntity } from '../actions/entities.js';

const template_bullet = () => ({
    tags: ['bullet'],
    size: 5,
    friction: 0,
    lifetime: 0,
    onCollision: [{
        tags: ['asteroid', 'ship'],
        cb: (bullet, victim, QueueAction) => QueueAction(destroyEntity(bullet.id)),
    }],
});

export default template_bullet;
