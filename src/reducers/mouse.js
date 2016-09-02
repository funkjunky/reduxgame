//TODO: put this in an inputs folder
const mouse = (state = {}, {type, x, y}) => {
    switch(type) {
        case 'mousemove':
            return {...state, x, y};
        default:
            return state;
    }
};

export default mouse;
