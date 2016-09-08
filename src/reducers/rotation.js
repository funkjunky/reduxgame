const rotation = (state = 0, { type, radians, rotationalVelocity, dt }) => {
    switch(type) {
        case 'tick':
            return state + (rotationalVelocity * dt);
        case 'set-rotation-vector-from-entity':
            return Math.atan2(action.y - action.entity.position.y, action.x - action.entity.position.x);
        default:
            return state;
    }
};

export default rotation;
