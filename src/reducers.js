import { combineReducers } from 'redux';

import world from './reducers/world.js';
import entities from './reducers/entities.js';
import ups from './reducers/ups.js';
import score from './reducers/score.js';
import asteroidSpawn from './reducers/asteroidspawn.js';

const reducers = combineReducers({
    world,
    entities,
    ups,
    score,
    asteroidSpawn,
});

const reducersWithReset = (state, action) => {
    if(action.type === 'reset')
        state = undefined;

    if(action.type === 'tick') //tick can use the world variables... ie. friction
        action.world = state.world; 

    return reducers(state, action);
};

export default reducersWithReset;
