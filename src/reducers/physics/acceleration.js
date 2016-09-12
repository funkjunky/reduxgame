import velocity from './velocity.js';
import { ACCELERATION } from '../../constants/actions.js';

//only apply controls if applyControls is true
const acceleration = (state = {x: 0, y: 0}, action) => {
    let {x, y} = state;
    //do what we need to do with velocity... we'll return it's value either way
    const _velocity = velocity(state._velocity, {...action, acceleration: { x, y }});
    switch(action.type) {
        case ACCELERATION.SET:
            return { ...state, ...action.acceleration, _velocity };
        default:
            return {...state, _velocity };
    };
};

export default acceleration;
