import addFrame from '../helpers/addframe.js';

//Frames per cycle
const fps = (state = {updates: 0, elapsed: 0, speed: 0}, action) => 
    (action.type === 'add_frame')
        ? addFrame(state, action)
        : state;

export default fps;
