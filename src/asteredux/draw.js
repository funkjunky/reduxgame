let oldScore = 0;
const draw = (state, ctx) => {
    state.entities.forEach((entity) => {
        drawEntity(ctx, entity);
    });
    if(state.score != oldScore) {
        oldScore = state.score;
        document.getElementById('score').textContent = state.score;
    }
};

export default draw;
