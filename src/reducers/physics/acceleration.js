import velocity from './velocity.js';

//only apply controls if applyControls is true
const acceleration = (state = {x: 0, y: 0}, { type, x, y } ) => {
    const _velocity = velocity(state, {...action, acceleration: { state.x, state.y }});
    switch(type) {
        case 'set-acceleration':
            return { x, y, _velocity };
        default:
            return {...state, _velocity };
    };
};

export default acceleration;
