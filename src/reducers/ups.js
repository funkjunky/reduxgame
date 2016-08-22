import addFrame from '../helpers/addframe.js';

//Updates per second
const ups = (state = {updates: 0, elapsed: 0, speed: 0}, action) => 
    (action.type === 'add_update')
        ? addFrame(state, action) //use fps reducer, but give the add_frame action, so we can use it's
        : state;

export default ups;
