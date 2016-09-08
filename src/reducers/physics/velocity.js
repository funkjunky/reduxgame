import friction from './friction.js';
import terminal from './terminal.js';
import position from './position.js';

const derivative = (state, {dt = 0, acceleration = {x: 0, y: 0}}) => ({
    x: state.x + acceleration.x * (dt / 1000),
    y: state.y + acceleration.y * (dt / 1000)
});

const velocity = (state={x:0, y:0}, action) => {
    const _position = position(state, {...action, velocity: { state.x, state.y }} );
    action.terminal = action.terminal || action.world.terminal;
    action.friction = action.friction || action.world.friction;
    switch(action.type) {
        case 'tick':
            return { ...terminal(friction(derivative(state, action), action), action), _position };
        default:
            return { ...state, _position };
    };
};

export default velocity;
