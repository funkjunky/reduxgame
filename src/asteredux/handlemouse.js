import { addBullet } from '../actions/entities.js';
import { setRotationVectorFromEntity } from '../actions/rotation.js';

const handleMouse = (dispatch, {x, y, button}) => {
    if(button)
        dispatch(addBullet('player1', { x, y });
    else
        dispatch(setRotationVectorFromEntity(x, y, (entity) => entity.tags.indexOf('player1') !== -1)); 
};

export default handleMouse;
