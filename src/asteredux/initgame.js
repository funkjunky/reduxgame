import { addShip } from '../actions/entities.js';
import { setAsteroidInterval } from '../actions/asteroidspawn.js';

const initGame = (dispatch) => {
    dispatch(addShip());
    dispatch(setAsteroidInterval());
};

export default initGame;
