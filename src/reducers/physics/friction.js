const absSub = (a, b) => {
    if(a < 0)
        return Math.min(a + b, 0);
    else
        return Math.max(a - b, 0);
};

const frictionAcc = 200;
const friction = (state, {dt = 0}) => ({
    x: absSub(state.x, frictionAcc * (dt / 1000)),
    y: absSub(state.y, frictionAcc * (dt / 1000))
});

export default friction;
