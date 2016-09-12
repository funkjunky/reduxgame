//Example use:
//let reduxInterval = ReduxInterval(10);
//createStore( ... , combineReducers(reduxInterval), ... );
//reduxInterval.play();
//reduxInterval.pause(); //to pause.
//
//reducer.js:
//const reducers = (state = 0, { type, dt }) => {
// switch(type) {
//      case 'tick':
//          console.log('time between frames: ', dt);
//          return state;
// }
//}
//TODO: interval should be an object, with different types and intervals...
//      ie. { 'tick': 10, 'collision-tick': 100, 'ai-tick': 1000 }
const ReduxInterval = (interval) => {
    let retObj = {
        play: null,
        pause: null,
        middleware: function(store) {
            //We define play and pause here, because they are meaningless until we apply the middleware.
            retObj.play = () => {
                let lastNow = Date.now();
                retObj._handler = setInterval(() => {
                    store.dispatch({type: TICK, dt: Date.now() - lastNow });
                    lastNow = Date.now();
                }, interval);
            };
            retObj.pause = () => clearInterval(retObj._handler);

            return next => action => next(action);
        },
        _handler: null,
    };

    return retObj;
};

export const TICK = 'tick';

export default ReduxInterval;
