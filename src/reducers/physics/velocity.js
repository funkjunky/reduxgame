import friction from './velocity/friction.js';
import terminal from './velocity/terminal.js';

const derivative = (state, action) => ({
    x: state.x + action.acceleration.x * (action.dt / 1000),
    y: state.y + action.acceleration.y * (action.dt / 1000)
});

const velocity = (state={x:0, y:0}, action) => {
    if(action.type != 'applyVelocity')
        return state;

    return [derivative, friction, terminal].reduce((state, reducer) => reducer(state, action), state);
};

export default velocity;
