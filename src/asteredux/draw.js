import drawEntity from '../helpers/drawentity.js';

let oldScore = 0;
const draw = (state, ctx) => {
    ctx.clearRect(0, 0, 640, 480);
    state.entities.forEach((entity) => {
        drawEntity(ctx, entity);
    });
    if(state.score != oldScore) {
        oldScore = state.score;
        document.getElementById('score').textContent = state.score;
    }
};

export default draw;
