const absSub = (a, b) => {
    if(a < 0)
        return Math.min(a + b, 0);
    else
        return Math.max(a - b, 0);
};

//TODO: put frictionAcc into a const
let frictionAcc = 400;
const friction = (state, action) => ({
    x: absSub(state.x, frictionAcc * (action.dt / 1000)),
    y: absSub(state.y, frictionAcc * (action.dt / 1000))
});

export default friction;
