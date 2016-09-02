import acceleration from './physics/acceleration.js';
import velocity from './physics/velocity.js';
import position from './physics/position.js';
import rotation from './rotation.js';

import { combineReducers } from 'redux';

const entities = (state=[], action) => {
    //Specialized action info to send to each reducer, depending on what we're reducing [which action type]
    //TODO: repeated code could be removed I think... state.map is done every time, move code out i think...
    switch(action.type) {
        case 'add_entity':
            return [...state,  entityReducer(action.defaults, action)];
        //TODO: fade out object or something... not just instantly gone...
        case 'destroy_entity':
            return [...state.filter((value, index) => value.id !== action.id)];
        //The following actions require additional info in their action based on the entity.
        case 'update_rotation':
            return state.map((entity, index) => entityReducer(entity, {...action, applyRotation: action.id === entity.id, position: entity.position, rotationalVelocity: entity.rotationalVelocity}));
        case 'apply_friction':
            return state.map((entity, index) => entityReducer(entity, {...action, friction: (entity.friction !== false) ? entity.friction : action.friction})); //apply entity friction over world friction
        case 'update_acceleration':
            return state.map((entity, index) => entityReducer(entity, {...action, applyControls: action.id === entity.id}));
        case 'apply_velocity':
            return state.map((entity) => entityReducer(entity, {...action, acceleration: entity.acceleration}));
        case 'apply_position':
            return state.map((entity) => entityReducer(entity, {...action, velocity: entity.velocity}));
        default:
            return state.map((entity) => entityReducer(entity, action));
    }
}

//TODO: doesn't exactly work as intended. Default is calculated every call...
const autoIncrementer = () => {
    let id = 0;
    return () => id++;
};

const idAutoIncrementer = autoIncrementer();
const entityReducer = combineReducers({
    tags: (state = []) => state,
    size: (state = false) => state,
    acceleration,
    velocity,
    position,
    rotation,
    friction: (state = false) => state,
    lifetime: (state = 0, {type, dt}) => (type === 'update_lifetime') ? state + dt : state,
    rotationalVelocity: (state = false) => state,
    onCollision: (state = []) => state,
    id: (state = idAutoIncrementer()) => state,
});

export default entities;
