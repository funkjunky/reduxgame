//TODO: put terminalVel into a const
let terminalVel = 200;
const terminal = (state, action) => {
    let magnitude = Math.sqrt(state.x * state.x + state.y * state.y);  

    if(magnitude === 0)
        return state;

    let normalized = {x: state.x / magnitude, y: state.y / magnitude};
    magnitude = Math.min(terminalVel, magnitude);

    return {x: normalized.x * magnitude, y: normalized.y * magnitude};
};

export default terminal;
