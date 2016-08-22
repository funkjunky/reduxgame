import friction from './friction.js';
import terminal from './terminal.js';

const derivative = (state, {dt = 0, acceleration = {x: 0, y: 0}}) => ({
    x: state.x + acceleration.x * (dt / 1000),
    y: state.y + acceleration.y * (dt / 1000)
});

const velocity = (state={x:0, y:0}, action) => {
    switch(action.type) {
        case 'apply_velocity':
            return terminal(derivative(state, action));
        case 'apply_friction':
            return terminal(friction(state, action));
        default:
            return terminal(state);
    };
};

export default velocity;
