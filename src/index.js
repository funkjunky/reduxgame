import { createStore, combineReducers } from 'redux';

let frictionAcc = 400;
let terminalVel = 200;
//Note: all speeds are pixels per second
document.addEventListener("DOMContentLoaded", () => {
    let reducers = (state = {pos: {x: 320, y: 240}, vel: {x: 0, y: 0}, acc: {x: 0, y: 0}}, action) => {
        switch(action.type) {
            case 'handle_events':
                //console.log('keypressed: ', action.keyPressed);
                switch(action.keyPressed) {
                    case 37: //left (clockwise)
                        return {...state, acc: {x: -800, y: 0}};
                    case 38:
                        return {...state, acc: {x: 0, y: -800}};
                    case 39:
                        return {...state, acc: {x: 800, y: 0}};
                    case 40:
                        return {...state, acc: {x: 0, y: 800}};
                    default:
                        return {...state, acc: {x: 0, y: 0}};
                };
            case 'physics':
                return {
                    ...state,
                    vel: vel(state.vel, {...action, acc: state.acc}), //TODO: try and shorthand this better
                    pos: pos(state.pos, {...action, vel: state.vel}),
                };
            case 'fps':
                return { ...state, fpsCount: fpsCount(state, action) };
            default:
                return state;
        }
    };

    const absSub = (a, b) => {
        if(a < 0)
            return Math.min(a + b, 0);
        else
            return Math.max(a - b, 0);
    };

    const derivative = (state, action) => ({
            x: state.x + action.acc.x * (action.dt / 1000),
            y: state.y + action.acc.y * (action.dt / 1000)
    });
    //additional vel reducers
    const friction = (state, action) => ({
        x: absSub(state.x, frictionAcc * (action.dt / 1000)),
        y: absSub(state.y, frictionAcc * (action.dt / 1000))
    });
    const terminalVelocity = (state, action) => {
        let magnitude = Math.sqrt(state.x * state.x + state.y * state.y);  

        if(magnitude === 0)
            return state;

        let normalized = {x: state.x / magnitude, y: state.y / magnitude};
        magnitude = Math.min(terminalVel, magnitude);

        return {x: normalized.x * magnitude, y: normalized.y * magnitude};
    };
    const vel = (state, action) => [derivative, friction, terminalVelocity].reduce((state, reducer) => reducer(state, action), state);

    const pos = (state, action) => ({
        x: state.x + action.vel.x * (action.dt / 1000),
        y: state.y + action.vel.y * (action.dt / 1000)
    });

    const fpsCount = (state, action) => 1000 / action.dt;

    let store = createStore(reducers, window.devToolsExtension && window.devToolsExtension());

    const canvas = document.querySelector('canvas');

    let lastTime = Date.now();
    const fps = 120;

    let keyPressed;
    canvas.addEventListener('keydown', (e) => keyPressed = e.which);
    canvas.addEventListener('keyup', (e) => {if(keyPressed == e.which) keyPressed = false;});

    let gameLoop = setInterval(() => {
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        update(Date.now() - lastTime);
        draw(ctx);

        lastTime = Date.now();
    }, 1000 / fps);

    const update = (dt) => {
        store.dispatch({ type: 'handle_events', dt, keyPressed });
        store.dispatch({ type: 'physics', dt });
        store.dispatch({ type: 'fps', dt });
    };

    const draw = (ctx) => {
        let state = store.getState();
        ctx.beginPath();
        ctx.moveTo(state.pos.x, state.pos.y);
        ctx.lineTo(state.pos.x+25,state.pos.y+25);
        ctx.lineTo(state.pos.x+25,state.pos.y-25);
        ctx.fill();
    };
});
