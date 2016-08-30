const normalizeVector = (vector, scale) => {
    if(vector.x === 0 && vector.y === 0)
        return vector;

    const magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);  

    return {x: vector.x * scale / magnitude, y: vector.y * scale / magnitude};
};

export default normalizeVector;
