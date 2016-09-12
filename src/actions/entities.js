import template_ship from '../entity-templates/ship.js';
import template_bullet from '../entity-templates/bullet.js';
import template_asteroid from '../entity-templates/asteroid.js';
import template_asteroid_piece from '../entity-templates/asteroid-piece.js';
import { ENTITIES } from '../constants/actions.js';

import { reset } from './reducer.js';

export const addEntity = (defaults) => ({
    type: ENTITIES.ADD,
    defaults,
});

export const destroyEntity = (id) => ({
    type: ENTITIES.DESTROY,
    id
});

//specific addEntity
export const addShip = () => addEntity(template_ship());

export const addAsteroid = () => addEntity(template_asteroid());

export const addAsteroidPiece = () => addEntity(template_asteroid_piece());

//Unique, because we don't have access to the entity or the velocity directly.
export const addBullet = (entityTag, targetPosition) => ({
    type: ENTITIES.ADD_BULLET,
    defaults: template_bullet(),
    entityTag,
    targetPosition,
});
