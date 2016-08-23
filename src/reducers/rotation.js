const rotation = (state = 0, {position, input, applyRotation = false}) => {
    return (applyRotation && (input.mouse.y - position.y))
        ? Math.atan2(input.mouse.y - position.y, input.mouse.x - position.x)
        : state;
};

export default rotation;
