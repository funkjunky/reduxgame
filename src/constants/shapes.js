import getAsteroidPoints from '../helpers/getasteroidpoints.js';

export const ship = {
    type: 'polygon',
    points: [
        [-0.5, -1.0],
        [-0.5, -0.5],
        [0.5, -0.5],
        [0.5, -1.0],
        [1.0, 0.0],
        [0.0, 1.0],
        [-1.0, 0.0],
        [-0.5, -1.0],
    ]
};

export const asteroid = [0,1,2,3,4,5,6,7,8,9].map(() => getAsteroidPoints());
