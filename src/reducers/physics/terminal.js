//TODO: put terminalVel into a const
let terminalVel = 300;
const terminal = (state, action) => {
    if(state.x === 0 && state.y === 0)
        return state;

    let magnitude = Math.sqrt(state.x * state.x + state.y * state.y);  

    let normalized = {x: state.x / magnitude, y: state.y / magnitude};
    magnitude = Math.min(terminalVel, magnitude);

    return {x: normalized.x * magnitude, y: normalized.y * magnitude};
};

export default terminal;
