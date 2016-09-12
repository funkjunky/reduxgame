import template_asteroid from '../entity-templates/asteroid.js';
import { addAsteroid } from '../actions/entities.js';
import { ASTEROIDSPAWN } from '../constants/actions.js';
import { TICK } from '../middlewares/reduxinterval.js';

const asteroidSpawn = (state = {dt: 0, interval: 99999}, { type, dt, interval, QueueAction }) => {
    switch(type) {
        case TICK:
            if((state.dt += dt) >= state.interval) {
                state.dt = 0;
                QueueAction(addAsteroid());
            }
            return { ...state };    //we already incremented dt in the if statement.
        case ASTEROIDSPAWN.SET_INTERVAL:
            return {
                ...state,
                interval,
            };
        default:
            return state;
    }
};

export default asteroidSpawn;
