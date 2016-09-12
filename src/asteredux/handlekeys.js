import { ACCELERATION } from '../constants/actions.js';

const handleKeys = (dispatch, { which, keyDown }) => {
    let action = { type: ACCELERATION.SET, filter: (entity) => entity.tags.indexOf('player1') !== -1 };
    if(keyDown) {
        switch(which) {
            case 65:
                return dispatch({ ...action, acceleration: { x: -1200 } });
            case 68:
                return dispatch({ ...action, acceleration: { x: 1200 } });
            case 87:
                return dispatch({ ...action, acceleration: { y: -1200 } });
            case 83:
                return dispatch({ ...action, acceleration: { y: 1200 } });
            //default: unhandled key
        };
    } else if(keyDown === false) {
        switch(which) {
            case 65:
            case 68:
                return dispatch({ ...action, acceleration: { x: 0 } });
            case 87:
            case 83:
                return dispatch({ ...action, acceleration: { y: 0 } });
            //default: unhandled key
        };
    }
};

export default handleKeys;
