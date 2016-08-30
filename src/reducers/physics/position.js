import infiniteBox from '../../helpers/infinitebox.js';

const position = (state = {x: 320, y: 240}, {dt = 0, velocity = {x: 0, y: 0}}) => infiniteBox({
    x: state.x + velocity.x * (dt / 1000),
    y: state.y + velocity.y * (dt / 1000)
});

export default position;
