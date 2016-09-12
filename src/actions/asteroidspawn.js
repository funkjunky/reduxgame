import { ASTEROIDSPAWN } from '../constants/actions.js';

export const setAsteroidInterval = () => ({
    type: ASTEROIDSPAWN.SET_INTERVAL,
    interval: 5000,
});
