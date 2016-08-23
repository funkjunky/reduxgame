import addFrame from '../helpers/addframe.js';

//Updates per second
const ups = (state = {updates: 0, elapsed: 0, speed: 0}, action) => 
    (action.type === 'add_update')
        ? addFrame(state, action)
        : state;

export default ups;
