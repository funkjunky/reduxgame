//TODO: put this in an inputs folder
const mouse = (state = {}, {type, clientX, clientY}) => {
    switch(type) {
        case 'mousemove':
            return {...state, x: clientX, y: clientY};
        default:
            return state;
    }
};

export default mouse;
