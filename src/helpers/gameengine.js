import ReduxInterval from '../middlewares/reduxinterval.js';
import ReduxRaf from '../middlewares/reduxraf.js';

const GameEngine = (interval, draw) => {
    let reduxInterval = ReduxInterval(interval);
    let reduxRaf = ReduxRaf(draw);
    let _paused = false;
    let thisObj = {
        play: () => {
            reduxInterval.play();
            reduxRaf.play();
            _paused = false;
        },
        pause: () => {
            reduxInterval.pause();
            reduxRaf.pause();
            _paused = true;
        },
        togglePause: () => {
            if(_paused)
                thisObj.play();
            else
                thisObj.pause();
        },
        middlewares: [ reduxInterval.middleware, reduxRaf.middleware ],
    };
    return thisObj;
};

export default GameEngine;
