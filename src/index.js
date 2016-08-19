import { createStore, combineReducers } from 'redux';
import reducers from './reducers.js';

//Note: all speeds are pixels per second
document.addEventListener("DOMContentLoaded", () => {
    let store = createStore(reducers, window.devToolsExtension && window.devToolsExtension());

    const canvas = document.querySelector('canvas');

    let lastTime = Date.now();
    const fps = 120;

    let gameLoop = setInterval(() => {
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        update(Date.now() - lastTime);
        draw(ctx);

        lastTime = Date.now();
    }, 1000 / fps);

    //TODO: use actions
    //TODO: put into files as well.
    let keysPressed = {};
    canvas.addEventListener('keydown', (e) => keysPressed[e.which] = true);
    canvas.addEventListener('keyup', (e) => keysPressed[e.which] = false);

    //TODO: put into separate file
    const update = (dt) => {
        store.dispatch({ type: 'applyAcceleration', dt, keysPressed });
        store.dispatch({ type: 'applyVelocity', dt, acceleration: store.getState().acceleration });
        store.dispatch({ type: 'applyPosition', dt, velocity: store.getState().velocity });
    };

    //TODO: put into separate file
    const draw = (ctx) => {
        let state = store.getState();
        ctx.beginPath();
        ctx.moveTo(state.position.x, state.position.y);
        ctx.lineTo(state.position.x+25,state.position.y+25);
        ctx.lineTo(state.position.x+25,state.position.y-25);
        ctx.fill();
    };
});
