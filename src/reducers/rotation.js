import { TICK } from '../middlewares/reduxinterval.js';
import { ROTATION } from '../constants/actions.js';

const rotation = (state = 0, { type, entity, x, y, rotationalVelocity, dt }) => {
    switch(type) {
        case TICK:
            return state + (rotationalVelocity * dt);
        case ROTATION.SET_FROM_TO:
            return Math.atan2(y - entity.position.y, x - entity.position.x);
        default:
            return state;
    }
};

export default rotation;
