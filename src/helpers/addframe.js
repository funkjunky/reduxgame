const addFrame = (state, {dt = 0}) => {
    let newState = {...state, frames: state.frames + 1, elapsed: state.elapsed + dt};
    if(newState.elapsed > 1000)
        newState = {...state, speed: newState.frames / (newState.elapsed / 1000), frames: 0, elapsed: 0};

    return newState;
};

export default addFrame;
