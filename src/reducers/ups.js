import addFrame from '../helpers/addframe.js';
import { TICK } from '../middlewares/reduxinterval.js';

//Updates per second
const ups = (state = {updates: 0, elapsed: 0, speed: 0}, action) => 
    (action.type === TICK)
        ? addFrame(state, action)
        : state;

export default ups;
