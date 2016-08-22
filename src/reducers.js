import { combineReducers } from 'redux';

import input from './reducers/input.js';
import entities from './reducers/entities.js';
import fps from './reducers/fps.js';
import ups from './reducers/ups.js';

//TODO: This doesn't work, because we want the value of acceleration to be used in velocity.
const reducers = combineReducers({
    input,
    entities,
    ups,
    fps,
});

export default reducers;
