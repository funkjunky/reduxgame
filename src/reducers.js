import acceleration from './reducers/physics/acceleration.js';
import velocity from './reducers/physics/velocity.js';
import position from './reducers/physics/position.js';

import { combineReducers } from 'redux';

import fps from './reducers/fps.js';

//TODO: This doesn't work, because we want the value of acceleration to be used in velocity.
const reducers = combineReducers({
    acceleration,
    velocity,
    position,
    fps,
});

export default reducers;
