import template_asteroid from './entity-templates/asteroid.js';
import { addAsteroid } from '../actions/entities.js';

const asteroidSpawn = (state = 0, { type, dt, interval, QueueAction }) => {
    switch(type) {
        case 'tick':
            if(state.dt += dt >= state.interval) {
                state.dt = 0;
                QueueActoin(addAsteroid());
            } else
                return { ...state };    //we already incremented dt in the if statement.
        case 'set-interval':
            return {
                ...state,
                interval,
            };
        default:
            return state;
    }
};

export default asteroidSpawn;
