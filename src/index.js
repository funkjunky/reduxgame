import { createStore } from 'redux';

document.addEventListener("DOMContentLoaded", () => {
    let reducers = (state = {pos: {x: 320, y: 240}}, action) => {
        switch(action.type) {
            case 'handle_events':
                switch(action.keyPressed) {
                    case 37: //left (clockwise)
                        return {...state, pos: {x: state.pos.x - 1, y: state.pos.y}};   //TODO: replace 1 with dt / player.speed
                    case 38:
                        return {...state, pos: {x: state.pos.x, y: state.pos.y - 1}};
                    case 39:
                        return {...state, pos: {x: state.pos.x + 1, y: state.pos.y}};
                    case 40:
                        return {...state, pos: {x: state.pos.x, y: state.pos.y + 1}};
                    default:
                        return state;
                }
            case 'tick':
                return state;
            default:
                return state;
        }
    };

    let store = createStore(reducers);

    const canvas = document.querySelector('canvas');

    let lastTime = Date.now();
    const fps = 60;

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
        store.dispatch({ type: 'tick', dt });
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
