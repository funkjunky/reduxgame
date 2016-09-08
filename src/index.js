import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import reducers from './reducers.js';
import drawEntity from './helpers/drawentity.js';
import getAsteroidPoints from './helpers/getasteroidpoints.js';
import template_ship from './entity-templates/ship.js';
import actionQueue from './middlewares/actionqueue.js';
import GameEngine from './helpers/gameengine.js';
import handleKeys from './asteredux/handlekeys.js';
import handleMouse from './asteredux/handlemouse.js';

//Note: all speeds are pixels per second
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const updateInterval = 10;

    //loops and data
    let gameEngine = GameEngine(updateInterval, (state) => draw(state, ctx));
    let store = createStore(reducers, compose(
        applyMiddleware(actionQueue, ...gameEngine.middlewares),
        window.devToolsExtension && window.devToolsExtension()
    ));

    //events
    canvas.addEventListener('keydown', ({which}) => (which === 32) ? gameEngine.togglePause() : null);
    canvas.addEventListener('keydown', ({which, keyDown: true }) => handleKeys(store.dispatch, {which})); //note: I need to isolate which, hence the curry
    canvas.addEventListener('keyup', ({which, keyDown: false }) => handleKeys(store.dispatch, {which})); //note: I need to isolate which, hence the curry
    canvas.addEventListener('mousemove', ({pageX, pageY}) => handleMouse(store.dispatch, { x: pageX - canvas.offsetLeft, y: pageY - canvas.offsetTop }));
    canvas.addEventListener('mouseup', (event) => handleMouse(store.dispatch, event));

    //initialize game
    initGame(store, gameEngine);

    //start the game
    reduxInterval.play();
});
