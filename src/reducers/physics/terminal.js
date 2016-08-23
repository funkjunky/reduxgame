const terminalVel = 300;
const terminal = (state, action) => {
    if(state.x === 0 && state.y === 0)
        return state;

    const magnitude = Math.sqrt(state.x * state.x + state.y * state.y);  

    const normalized = {x: state.x / magnitude, y: state.y / magnitude};
    const adjustedMagnitude = Math.min(terminalVel, magnitude);

    return {x: normalized.x * adjustedMagnitude, y: normalized.y * adjustedMagnitude};
};

export default terminal;
