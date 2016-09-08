import acceleration from './physics/acceleration.js';
import rotation from './rotation.js';
import handleCollisions from '../helpers/handlecollisions.js';
import normalizeVector from '../helpers/normalizevector.js';
import vectorMinus from '../helpers/vectorminus.js';

import { combineReducers } from 'redux';

const entities = (state=[], action) => {
    switch(action.type) {
        case 'add_bullet':
            //calculate position and velocity based on entity and target
            const entity = state.find((entity) => entity.tags.indexOf(action.entityTag) !== -1);
            action.defaults.position = entity.position;
            action.defaults.velocity = normalizeVector(vectorMinus(action.targetPosition, entity.position), 800);
        case 'add_entity':
            return [...state,  entityReducer(action.defaults, action)];
        //TODO: fade out object or something... not just instantly gone...
        case 'destroy_entity':
            return [...state.filter((value) => value.id !== action.id)];

        //handling collisions, then falling through, for lower level tick reducers
        case 'tick':
            handleCollisions(entities, action.QueueAction);
        //We need to give rotation the entity it needs to calculate the radian rotation.
        case 'set-rotation-vector-from-entity':
            action.entity = state.find(action.filter);
        //we apply a filter if it exists, so we only reducer the entity we intended to reduce.
        default:
            return state.map((entity) => (action.filter && action.filter(entity))
                ? entityReducer(entity, action)
                : entity
            );
    }
}

//TODO: doesn't exactly work as intended. Default is calculated every call...
const autoIncrementer = () => {
    let id = 0;
    return () => id++;
};

const entityTemplate = {
    get velocity()      { return this.acceleration._velocity; },
    set velocity(val)   { this.acceleration._velocity = val; },
    get position()      { return this.acceleration._velocity._position; },
    set position(val)   { this.acceleration._velocity._position = val; },
    get rotation()      { return this.rotationalVelocity._rotation; },
    set rotation(val)   { this.rotationalVelocity._rotation = val; },
};
const idAutoIncrementer = autoIncrementer();
const entityReducer = (state, action) => ({
    ...entityTemplate,
    ...combineReducers({
        id: (state = idAutoIncrementer()) => state,
        tags: (state = []) => state,
        size: (state = false) => state,

        acceleration,
        rotationalVelocity: (state = false) => ({...state, rotation(state, {...action, rotationalVelocity: { state.x, state.y }})}),
        lifetime: (state = 0, {type, dt}) => (type === 'tick') ? state + dt : state,

        onCollision: (state = []) => state,
    })
});

export default entities;
