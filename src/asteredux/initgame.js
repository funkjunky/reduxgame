import { addShip } from './actions/entities.js';

const initGame = (store, engine) => {
    store.dispatch(addShip());
};

export default initGame;
