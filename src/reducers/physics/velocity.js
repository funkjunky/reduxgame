import friction from './friction.js';
import terminal from './terminal.js';
import position from './position.js';
import { TICK } from '../../middlewares/reduxinterval.js';

const derivative = (state, {dt = 0, acceleration = {x: 0, y: 0}}) => ({
    x: state.x + acceleration.x * (dt / 1000),
    y: state.y + acceleration.y * (dt / 1000)
});

const velocity = (state = {x: 0, y: 0, friction: null, terminal: null}, action) => {
    let {x, y} = state;
    const _position = position(state._position, {...action, velocity: { x, y }} );
    switch(action.type) {
        case TICK:
            action.terminal = state.terminal || action.world.terminal;
            action.friction = state.friction || action.world.friction;
            return { ...state, ...terminal(friction(derivative(state, action), action), action), _position };
        default:
            return { ...state, _position };
    };
};

export default velocity;
