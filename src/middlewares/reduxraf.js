const ReduxRaf = (draw) => ({
    play: null,
    pause: null,
    middleware: store => {
        //raf draw loop.
        const rafDraw = dt => {
            draw(store.getState(), dt)
            if(!this._paused)
                window.requestAnimationFrame(rafDraw);
        };

        //set play and pause, now that store is initialized
        let _paused = false;
        this.play = {
            _paused = false;
            window.requestAnimationFrame(rafDraw);
        };
        this.pause = () => _paused = true;

        return next => action => next(action);
    },
});

export default ReduxRaf;
