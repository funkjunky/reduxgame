const width = 640;
const height = 480;
const padding = 20;

const infiniteBox = ({x, y}) => ({
    x: (x > width + padding)
        ? x - (width + padding)
        : ((x < -padding)
            ? width + (x + padding)
            : x),
    y: (y > height + padding)
        ? y - (height + padding)
        : ((y < -padding)
            ? height + (y + padding)
            : y)
});

export default infiniteBox;
