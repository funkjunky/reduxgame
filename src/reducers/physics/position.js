const position = (state={x: 320, y: 240}, action) => {
    if(action.type != 'applyPosition')
        return state;

    return {
        x: state.x + action.velocity.x * (action.dt / 1000),
        y: state.y + action.velocity.y * (action.dt / 1000)
    }
};

export default position;
