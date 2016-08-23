import { combineReducers } from 'redux';

import input from './reducers/input.js';
import entities from './reducers/entities.js';
import fps from './reducers/fps.js';
import ups from './reducers/ups.js';

const reducers = combineReducers({
    input,
    entities,
    ups,
    fps,
});

export default reducers;
