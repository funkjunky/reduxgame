import { addEntity, addShip } from '../src/actions/entities.js';
import { ENTITIES } from '../src/constants/actions.js';

var expect = require('chai').expect;

describe('entities action addEntity', () => {
    it('should return an entity action with defaults', () => {
        expect(addEntity({size: 10})).to.be.deep.equal({type: ENTITIES.ADD, defaults: {size: 10}});
    });
});
