const inputs = (state = {}, action) => {
    switch(action.type) {
        case 'keydown':
            return { ...state, [action.which]: true };
        case 'keyup':
            return { ...state, [action.which]: false };
        default:
            return state;
    }
};

export default inputs;
