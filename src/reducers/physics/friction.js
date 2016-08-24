const absSub = (a, b) => {
    if(a < 0)
        return Math.min(a + b, 0);
    else
        return Math.max(a - b, 0);
};

const friction = (state, {dt = 0, friction}) => ({
    x: absSub(state.x, friction * (dt / 1000)),
    y: absSub(state.y, friction * (dt / 1000))
});

export default friction;
