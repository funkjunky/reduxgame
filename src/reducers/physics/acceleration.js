const movement = (state = {x: 0, y: 0}, action) => {
    if(action.type != 'applyAcceleration')
        return state;

    //console.log('keypressed: ', action.keysPressed);
    let newAcc = {...state};
    //TODO: write cleaner shorter code for this.
    if(action.keysPressed[37] && !action.keysPressed[39])
        newAcc.x = -800;
    else if(action.keysPressed[39] && !action.keysPressed[37])
        newAcc.x = 800;
    else
        newAcc.x = 0;

    if(action.keysPressed[38] && !action.keysPressed[40])
        newAcc.y = -800;
    else if(action.keysPressed[40] && !action.keysPressed[38])
        newAcc.y = 800;
    else
        newAcc.y = 0;

    return newAcc;
};

export default movement;
