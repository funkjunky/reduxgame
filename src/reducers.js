import { combineReducers } from 'redux';

import input from './reducers/input.js';
import world from './reducers/world.js';
import entities from './reducers/entities.js';
import fps from './reducers/fps.js';
import ups from './reducers/ups.js';
import score from './reducers/score.js';
import asteroidSpawn from './reducers/asteroidspawn.js';

const reducers = combineReducers({
    input,
    world,
    entities,
    ups,
    fps,
    score,
    asteroidSpawn,
});

const reducersWithReset = (state, action) => {
    if(action.type === 'reset')
        state = undefined;

    return reducers(state, action);
};

export default reducersWithReset;
