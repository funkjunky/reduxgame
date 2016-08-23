import acceleration from './physics/acceleration.js';
import velocity from './physics/velocity.js';
import position from './physics/position.js';
import rotation from './rotation.js';

import { combineReducers } from 'redux';

const entities = (state=[], action) => {
    //Specialized action info to send to each reducer, depending on what we're reducing [which action type]
    switch(action.type) {
        case 'add_entity':
            return [...state,  entityReducer(action.defaults, action)];
        //The following actions require additional info in their action based on the entity.
        case 'update_rotation':
            return state.map((entity, index) => entityReducer(entity, {...action, applyRotation: action.entity_id === index, position: entity.position}));
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
    acceleration,
    velocity,
    position,
    rotation,
});

export default entities;
