import ReduxInterval from './middlewares/reduxInterval.js';
import ReduxRaf from './middlewares/reduxRaf.js';

const GameEngine = ({ interval, draw }) => {
    let reduxInterval = ReduxInterval(interval);
    let reduxRaf = ReduxRaf(draw);
    let _paused = false;
    return {
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
                this.play();
            else
                this.pause();
        },
        middlewares: [ reduxInterval.middleware, reduxRaf.middleware ],
    };
};

export default GameEngine;
