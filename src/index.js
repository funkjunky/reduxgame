import { createStore, combineReducers } from 'redux';
import reducers from './reducers.js';
import { ship } from './constants/shapes.js';
import drawEntity from './helpers/drawentity.js';
import vectorMinus from './helpers/vectorminus.js';
import getAsteroidPoints from './helpers/getasteroidpoints.js';
import normalizeVector from './helpers/normalizevector.js';
import crossFilter from './helpers/crossfilter.js';
import entitiesIntersect from './helpers/entitiesintersect.js';
//import getRandomPointNotTouching from './helpers/getrandompointnottouching.js';

//Note: all speeds are pixels per second
document.addEventListener("DOMContentLoaded", () => {
    let store = createStore(reducers, window.devToolsExtension && window.devToolsExtension());

    const canvas = document.querySelector('canvas');

    let lastUpdateTime = Date.now();
    let lastDrawTime = Date.now();
    const fps = 120;
    const updateDelay = 10;

    let players = 0;
    var newShipAction = {
        type: 'add_entity',
        defaults: {
            tags: ['ship', 'player', 'player'+ ++players],
            //TODO: think of a way that is nicer for ships, asteroids, and bullets a like.
            size: 20,
            position: {x: 320, y: 320},
            onCollision: [{
                tags: ['asteroid', 'bullet'],
                cb: () => {
                    pause();
                    //TODO: messy move
                    let ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    store.dispatch({ type: 'reset' });
                    setTimeout(() => {
                        store.dispatch(newShipAction);
                        play();
                    }, 5000);
                },
            }],
            id: -2,
        },
    };
    store.dispatch(newShipAction);

    let gameLoop, drawLoop;
    const play = () => {
        gameLoop = setInterval(() => {
            update(Date.now() - lastUpdateTime);
            lastUpdateTime = Date.now();
        }, updateDelay);

        drawLoop = setInterval(() => {
            let ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            store.dispatch({ type: 'add_frame', dt: Date.now() - lastDrawTime });
            lastDrawTime = Date.now();
            draw(ctx);
        }, 1000 / fps);
    };
    const pause = () => {
        clearInterval(gameLoop);
        clearInterval(drawLoop);
    };
    play();

    const asteroid_peice_template = (props) => ({
        tags: ['asteroid', 'asteroid-peice', 'asteroid-shape-'+Math.floor(Math.random()*10)], //tags are unique. I'd like to combine them.
        size: 5,
        velocity: {
            x: (Math.random() - 0.5) * 50,
            y: (Math.random() - 0.5) * 50
        },
        friction: 0,
        lifetime: 0,
        rotationalVelocity: 0.001 - 0.002 * Math.random(),
        onCollision: [{
            tags: ['bullet', 'ship'],
            cb: (asteroid, victim) => { 
                store.dispatch({
                    type: 'destroy_entity',
                    id: asteroid.id,
                });
                store.dispatch({
                    type: 'add_score',
                    score: 2,
                });
            },
        }],
        ...props,
    });

    //TODO: reduce the spawning interval by x ms every y ms
    const spawningInterval = 5000;
    let newAsteroidCall = () => {
        store.dispatch({
            type: 'add_entity',
            defaults: {
                tags: ['asteroid', 'asteroid-shape-'+Math.floor(Math.random()*10)],
                size: 20,
                position: {
                    x: 20 + Math.random() * (640 - 20),
                    y: 20 + Math.random() * (480 - 20),
                },
                velocity: {
                    x: (Math.random() - 0.5) * 50,
                    y: (Math.random() - 0.5) * 50
                },
                friction: 0,
                lifetime: 0,
                rotationalVelocity: 0.001 - 0.002 * Math.random(),
                onCollision: [{
                    tags: ['bullet', 'ship'],
                    cb: (asteroid, victim) => {
                        let peices = 3 + Math.random() * 4;
                        for(let i=0; i < peices; ++i)
                            store.dispatch({
                                type: 'add_entity',
                                defaults: asteroid_peice_template({
                                    position: asteroid.position,
                                    size: 1 + Math.ceil(asteroid.size / peices),
                                }),   //TODO: can i JUST write asteroid.position? Probably, not but try!
                            });
                        store.dispatch({
                            type: 'destroy_entity',
                            id: asteroid.id,
                        });
                        store.dispatch({
                            type: 'add_score',
                            score: 1,
                        });
                    },
                }],
            },
        });
    };

    canvas.addEventListener('keydown', ({which}) => (which === 32) ? pause() : null);

    canvas.addEventListener('keydown', ({which}) => (!store.getState().input[which]) ? store.dispatch({type: 'keydown', which}) : null);
    canvas.addEventListener('keyup', ({which}) => store.dispatch({type: 'keyup', which}));
    canvas.addEventListener('mousemove', ({pageX, pageY}) => store.dispatch({type: 'mousemove', x: pageX - canvas.offsetLeft, y: pageY - canvas.offsetTop}));
    canvas.addEventListener('mouseup', ({button}) => store.dispatch({
        type: 'add_entity',
        defaults: {
            tags: ['bullet'],
            size: 5,
            position: store.getState().entities.find((entity) => entity.tags.indexOf('player1')).position,
            //TODO: should use player's rotation... but vectors are so much nicer... perhaps store player direction as vector instead of radians
            //      perhaps only translate to radians during the ctx.rotate in drawEntity 
            velocity: normalizeVector(vectorMinus(store.getState().input.mouse, store.getState().entities[0].position), 800),
            friction: 0,
            lifetime: 0,
            onCollision: [{
                tags: ['asteroid', 'ship'],
                cb: (bullet, victim) => store.dispatch({
                    type: 'destroy_entity',
                    id: bullet.id,
                }),
            }],
        },
    }));

    //TODO: put in its own helper file
    const intersection = (arr1, arr2) => arr1.filter((value) => arr2.indexOf(value) !== -1);

    const update = (dt) => {
        store.dispatch({ type: 'update_acceleration', dt, id: -2, input: store.getState().input });
        //TODO: update rotation is doing two things...
        store.dispatch({ type: 'update_rotation', dt, id: -2, input: store.getState().input });
        store.dispatch({ type: 'apply_friction', dt, friction: store.getState().world.friction });
        store.dispatch({ type: 'apply_velocity', dt, terminal: store.getState().world.terminal });
        store.dispatch({ type: 'apply_position', dt });
        store.dispatch({ type: 'add_update', dt });
        store.dispatch({ type: 'update_lifetime', dt });
        //TODO: i feel like many of these could be done at once...
        store.dispatch({ type: 'increment_timer', dt });
        handleCollisions();
        //TODO: asteroidSpawn is aterrible name
        if(store.getState().asteroidSpawn >= spawningInterval) {
            console.log('spawning new?', spawningInterval);
            newAsteroidCall();
            //TODO: trash laziness
            store.dispatch({ type: 'increment_timer', dt: -store.getState().asteroidSpawn });
        }
    };

    const handleCollisions = () => {
        let canCollide = crossFilter(
            store.getState().entities,
            (a, b) =>
                a.onCollision.some((event) =>
                    event.tags.some((tag) => b.tags.indexOf(tag) != -1)) //has a matching tag to the collision event
        );
        canCollide.filter(([a, b]) => entitiesIntersect(a,b))
            .forEach(([entityA, entityB]) => 
                entityA.onCollision.find((event) => intersection(event.tags, entityB.tags).length > 0).cb(entityA, entityB)
            );
    };

    //TODO: put into separate file
    let oldScore = 0;
    const draw = (ctx) => {
        const state = store.getState();
        state.entities.forEach((entity) => {
            drawEntity(ctx, entity);
        });
        //TODO: this is awful, but i was too lazy to put in something better and didnt want to spam DOM updates
        if(state.score != oldScore) {
            oldScore = state.score;
            document.getElementById('score').textContent = state.score;
        }
    };
});
