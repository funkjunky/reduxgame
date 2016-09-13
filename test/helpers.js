import crossFilter from '../src/helpers/crossfilter.js';
import entitiesIntersect from '../src/helpers/entitiesIntersect.js';

var expect = require('chai').expect;

describe('crossFilter', () => {
    let arr = [2, 3, 4, 5, 6, 7, 9];
    it('returns returns the numbers that evenly divide into each other', () => {
        expect(crossFilter(arr, (a, b) => a % b === 0)).to.deep.equal([ [4, 2], [6, 2], [6, 3], [9, 3] ]);
    });
});

describe('entitiesIntersect', () => {
    let entities = [
        {
            position: {x: 0, y: 0},
            size: 20,
        },
        {
            position: {x: 50, y: 50},
            size: 20,
        },
        {
            position: {x: 10, y: 10},
            size: 20,
        },
    ];
    it('return true for entities that are close enough to each other', () => {
        expect(entitiesIntersect(entities[0], entities[2])).to.be.true;
    });

    it('return false for entities that are not close enough', () => {
        expect(entitiesIntersect(entities[0], entities[1])).to.be.false;
    });
});
