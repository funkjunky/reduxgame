import acceleration from './physics/acceleration.js';
import rotation from './rotation.js';
import handleCollisions from '../helpers/handlecollisions.js';
import normalizeVector from '../helpers/normalizevector.js';
import vectorMinus from '../helpers/vectorminus.js';
import { ENTITIES, ROTATION } from '../constants/actions.js';
import { TICK } from '../middlewares/reduxinterval.js';

import { combineReducers } from 'redux';

const entities = (state=[], action) => {
    switch(action.type) {
        case ENTITIES.ADD_BULLET:
            //calculate position and velocity based on entity and target
            const entity = state.find((entity) => entity.tags.indexOf(action.entityTag) !== -1);
            action.defaults.position = entity.position;
            action.defaults.velocity = {...action.defaults.velocity, ...normalizeVector(vectorMinus(action.targetPosition, entity.position), 800)}
        case ENTITIES.ADD:
            let newEntity = entityReducer(action.defaults, action)
            if(action.defaults.velocity)
                newEntity.velocity = action.defaults.velocity;
            if(action.defaults.position)
                newEntity.position = action.defaults.position;
            return [...state, newEntity];
        //TODO: fade out object or something... not just instantly gone...
        case ENTITIES.DESTROY:
            return [...state.filter((value) => value.id !== action.id)];

        //handling collisions, then falling through, for lower level tick reducers
        case TICK:
            handleCollisions(state, action.QueueAction);
            return state.map((entity) => entityReducer(entity, action));
        //We need to give rotation the entity it needs to calculate the radian rotation.
        case ROTATION.SET_FROM_TO:
            if(!action.filter)
                return state.map((entity) => entityReducer(entity, action));
            else {
                action.entity = state.find(action.filter);
                return state.map((entity) => ((action.filter(entity))
                    ? entityReducer(entity, action)
                    : entity
                ));
            }
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

const idAutoIncrementer = autoIncrementer();
const myCombineReducer = combineReducers({
    id: (state = idAutoIncrementer()) => state,
    tags: (state = []) => state,
    size: (state = false) => state,

    acceleration,
    rotationalVelocity: (state = { velocity: 0 }, action) => ({velocity: state.velocity, _rotation: rotation(state._rotation, {...action, rotationalVelocity: state.velocity})}),
    lifetime: (state = 0, {type, dt}) => (type === 'tick') ? state + dt : state,

    onCollision: (state = []) => state,

    //these go last to appease combine reducer. Because the setter and getter refer to the same thing, it's basically a no-ops
    //They return false, which the setters ignore... god this is turning terribly...
    velocity: (state) => false,
    position: (state) => false,
    rotation: (state) => false,
});
const entityReducer = (state, action) => ({
    get velocity()      { return this.acceleration._velocity; },
    set velocity(val)   { if(val !== false) this.acceleration._velocity = val; },
    get position()      { return this.acceleration._velocity._position; },
    set position(val)   { if(val !== false) this.acceleration._velocity._position = val; },
    get rotation()      { return this.rotationalVelocity._rotation; },
    set rotation(val)   { if(val !== false) this.rotationalVelocity._rotation = val; },
    ...myCombineReducer(state, action),
});

export default entities;
