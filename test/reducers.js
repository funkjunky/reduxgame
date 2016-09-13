import entities from '../src/reducers/entities.js';
import { TICK } from '../src/middlewares/reduxinterval.js';

var expect = require('chai').expect;

describe('entities reducer', () => {
    const state = {
        velocity: {
            x: 10,
            y: 10,
        },
        position: {
            x: 0,
            y: 0,
        },
    };
    const tickAction = {
        type: TICK,
        dt: 1000,
        world: {
            friction: 0,
            terminal: 99999,
        },
    };
    it('should reduce velocity to a new position [through getter]', () => {
        expect(entities([state], tickAction)[0]).to.deep.include({ position: {x: 10, y: 10} });
    });
});
