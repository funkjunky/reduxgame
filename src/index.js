import { createStore, combineReducers } from 'redux';
import reducers from './reducers.js';
import drawEntity from './helpers/drawentity.js';
import vectorMinus from './helpers/vectorminus.js';
import getAsteroidPoints from './helpers/getasteroidpoints.js';
import normalizeVector from './helpers/normalizevector.js';
//import getRandomPointNotTouching from './helpers/getrandompointnottouching.js';

//Note: all speeds are pixels per second
document.addEventListener("DOMContentLoaded", () => {
    let store = createStore(reducers, window.devToolsExtension && window.devToolsExtension());

    const canvas = document.querySelector('canvas');

    let lastUpdateTime = Date.now();
    let lastDrawTime = Date.now();
    const fps = 120;
    const updateDelay = 10;

    store.dispatch({
        type: 'add_entity',
        defaults: {
            draw: {
                shape: 'ship',
                size: 20,
            },
            position: {x: 320, y: 320}
        },
    });
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

    //TODO: reduce the spawning interval by x ms every y ms
    const spawningInterval = 5000;
    let newAsteroidLoop = setInterval(() => {
        //getNewAsteroid(store.getState.entites);
        store.dispatch({
            type: 'add_entity',
            defaults: {
                draw: {
                    shape: 'asteroid',
                    size: 20 + Math.random() * 5,
                    points: getAsteroidPoints(),
                },
                position: {
                    x: 20 + Math.random() * (640 - 20),
                    y: 20 + Math.random() * (480 - 20),
                },
                velocity: {
                    x: (Math.random() - 0.5) * 50,
                    y: (Math.random() - 0.5) * 50
                },
                friction: 0,
                rotationalVelocity: 0.001 * Math.random(),
            },
        });
    }, spawningInterval);

    canvas.addEventListener('keydown', ({which}) => (!store.getState().input[which]) ? store.dispatch({type: 'keydown', which}) : null);
    //canvas.addEventListener('mousedown', ({button}) => (!store.getState().input[button]) ? store.dispatch({type: 'keydown', button}) : null);
    canvas.addEventListener('keyup', ({which}) => store.dispatch({type: 'keyup', which}));
    //canvas.addEventListener('mouseup', ({button}) => store.dispatch({type: 'keyup', button}));
    canvas.addEventListener('mousemove', ({clientX, clientY}) => store.dispatch({type: 'mousemove', clientX, clientY}));
    canvas.addEventListener('mouseup', ({button}) => store.dispatch({
        type: 'add_entity',
        defaults: {
            draw: {
                shape: 'circle',
                size: 5,
            },
            position: store.getState().entities[0].position,
            //TODO: should use player's rotation... but vectors are so much nicer... perhaps store player direction as vector instead of radians
            //      perhaps only translate to radians during the ctx.rotate in drawEntity 
            velocity: normalizeVector(vectorMinus(store.getState().input.mouse, store.getState().entities[0].position), 800),
            friction: 0,
        },
    }));

    const update = (dt) => {
        store.dispatch({ type: 'update_acceleration', dt, entity_id: 0, input: store.getState().input });
        //TODO: update rotation is doing two things...
        store.dispatch({ type: 'update_rotation', dt, entity_id: 0, input: store.getState().input });
        store.dispatch({ type: 'apply_friction', dt, friction: store.getState().world.friction });
        store.dispatch({ type: 'apply_velocity', dt, terminal: store.getState().world.terminal });
        store.dispatch({ type: 'apply_position', dt });
        store.dispatch({ type: 'add_update', dt });
    };

    //TODO: put into separate file
    const draw = (ctx) => {
        let state = store.getState();
        state.entities.forEach((entity) => {
            drawEntity(ctx, entity);
        });
    };
});
