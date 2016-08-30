const getNormalizedPoint = (x, y) => ([
    x - 0.5 + Math.random() * 1,
    y - 0.5 + Math.random() * 1
]);
let p = getNormalizedPoint;

const getAsteroidPoints = () => [
    p(0, -1),
    p(1, -1),
    p(1, 0),
    p(1, 1),
    p(0, 1),
    p(-1, 1),
    p(-1, 0),
    p(-1, -1)
];

export default getAsteroidPoints;
