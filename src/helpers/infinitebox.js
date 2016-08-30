const width = 640;
const height = 480;

const infiniteBox = ({x, y}) => ({
    x: (x > width)
        ? x - width 
        : ((x < 0)
            ? width + x
            : x),
    y: (y > width)
        ? y - width 
        : ((y < 0)
            ? width + y
            : y)
});

export default infiniteBox;
