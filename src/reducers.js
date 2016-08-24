import { combineReducers } from 'redux';

import input from './reducers/input.js';
import world from './reducers/world.js';
import entities from './reducers/entities.js';
import fps from './reducers/fps.js';
import ups from './reducers/ups.js';

const reducers = combineReducers({
    input,
    world,
    entities,
    ups,
    fps,
});

export default reducers;
