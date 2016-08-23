import { createStore, combineReducers } from 'redux';
import reducers from './reducers.js';

//Note: all speeds are pixels per second
document.addEventListener("DOMContentLoaded", () => {
    let store = createStore(reducers, window.devToolsExtension && window.devToolsExtension());

    const canvas = document.querySelector('canvas');

    let lastUpdateTime = Date.now();
    let lastDrawTime = Date.now();
    const fps = 120;
    const updateDelay = 10;

    store.dispatch({ type: 'add_entity', defaults: {position: {x: 320, y: 320}}});
    let gameLoop = setInterval(() => {
        update(Date.now() - lastUpdateTime);
        lastUpdateTime = Date.now();
    }, updateDelay);

    let drawLoop = setInterval(() => {
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        store.dispatch({ type: 'add_frame', dt: Date.now() - lastDrawTime });
        lastDrawTime = Date.now();
        draw(ctx);
    }, 1000 / fps);

    canvas.addEventListener('keydown', ({which}) => (!store.getState().input[which]) ? store.dispatch({type: 'keydown', which}) : null);
    canvas.addEventListener('keyup', ({which}) => store.dispatch({type: 'keyup', which}));

    const update = (dt) => {
        store.dispatch({ type: 'update_acceleration', dt, entity_id: 0, input: store.getState().input });
        store.dispatch({ type: 'apply_velocity', dt });
        store.dispatch({ type: 'apply_friction', dt });
        store.dispatch({ type: 'apply_position', dt });
        store.dispatch({ type: 'add_update', dt });
    };

    //TODO: put into separate file
    const draw = (ctx) => {
        let state = store.getState();
        ctx.beginPath();
        ctx.moveTo(state.entities[0].position.x, state.entities[0].position.y);
        ctx.lineTo(state.entities[0].position.x+25,state.entities[0].position.y+25);
        ctx.lineTo(state.entities[0].position.x+25,state.entities[0].position.y-25);
        ctx.fill();
    };
});
