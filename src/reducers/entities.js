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
        //The following actions require additional info in their action based on the entity.
        case 'update_rotation':
            return state.map((entity, index) => entityReducer(entity, {...action, applyRotation: action.entity_id === index, position: entity.position}));
        case 'apply_friction':
            return state.map((entity, index) => entityReducer(entity, {...action, friction: (entity.friction !== false) ? entity.friction : action.friction})); //apply entity friction over world friction
        case 'update_acceleration':
            return state.map((entity, index) => entityReducer(entity, {...action, applyControls: action.entity_id === index}));
        case 'apply_velocity':
            return state.map((entity) => entityReducer(entity, {...action, acceleration: entity.acceleration}));
        case 'apply_position':
            return state.map((entity) => entityReducer(entity, {...action, velocity: entity.velocity}));
        default:
            return state.map((entity) => entityReducer(entity, action));
    }
}

const entityReducer = combineReducers({
    draw: (state = {}) => state,
    acceleration,
    velocity,
    position,
    rotation,
    friction: (state = false) => state,
});

export default entities;
