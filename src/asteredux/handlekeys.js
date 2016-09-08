const handleKeys = (dispatch, { which, keyDown }) => {
    action = { action: 'set-acceleration', filter: (entity) => entity.tags.indexOf('player1') !== -1 };
    if(keyDown)
        switch(which) {
            case 65:
                dispatch({ ...action, x: -1200 }); break;
            case 68:
                dispatch({ ...action, x: 1200 }); break;
            case 87:
                dispatch({ ...action, y: -1200 }); break;
            case 83:
                dispatch({ ...action, y: 1200 }); break;
            //default: unhandled key
        };
    else if(keyDown === false)
        switch(which) {
            case 65:
            case 68:
                dispatch({ ...action, x: 0 }); break;
            case 87:
            case 83:
                dispatch({ ...action, y: 0 }); break;
            //default: unhandled key
        };
};

export default handleKeys;
