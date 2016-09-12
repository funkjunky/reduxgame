import { addShip } from '../actions/entities.js';
import { setAsteroidInterval } from '../actions/asteroidspawn.js';

const initGame = (store, engine) => {
    store.dispatch(addShip());
    store.dispatch(setAsteroidInterval());
};

export default initGame;
