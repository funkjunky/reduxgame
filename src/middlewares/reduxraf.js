const ReduxRaf = (draw) =>  {
    let retObj = {
        play: null,
        pause: null,
        middleware: store => {
            //raf draw loop.
            const rafDraw = dt => {
                draw(store.getState(), dt)
                if(!retObj._paused)
                    window.requestAnimationFrame(rafDraw);
            };

            //set play and pause, now that store is initialized
            let _paused = false;
            retObj.play = () => {
                _paused = false;
                window.requestAnimationFrame(rafDraw);
            };
            retObj.pause = () => _paused = true;

            return next => action => next(action);
        },
    };
    return retObj;
};

export default ReduxRaf;
