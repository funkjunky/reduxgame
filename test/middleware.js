import actionQueue from '../src/middlewares/actionqueue.js';

var expect = require('chai').expect;

describe('actionQueue middleware', () => {
    it('should give a method QueueAction to the reducer [next]', () => {
        //TODO: use a better mock object, this is hard to understand.
        let touched = false;
        const mockStore = {dispatch: (action) => { if(action.type === 'hello') touched = true; }};
        let middleware = actionQueue(mockStore);
        let reducerCB = (action) => action.QueueAction({ type: 'hello' });
        middleware(reducerCB)({type: 'unimportant'});

        expect(touched).to.be.true;
    });
});
