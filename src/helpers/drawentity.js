import { ship, asteroid } from '../constants/shapes.js';

const drawPolygon = (ctx, points) => {
    ctx.beginPath();
    //move the pen to the first point and remove that point
    const first = points.slice(0, 1);
    ctx.moveTo(first[0], first[1]);

    //draw the polygon, line by line, in order.
    points.slice(1).forEach(([x, y]) => ctx.lineTo(x, y));
}

const drawEntity = (ctx, entity) => {
    ctx.save();

    //translate the context to the center of the drawing
    ctx.translate(entity.position.x, entity.position.y);
    ctx.rotate(entity.rotation + Math.PI / 2);
    ctx.scale(entity.size, entity.size);

    if(entity.tags.indexOf('ship') !== -1)
        drawPolygon(ctx, ship.points);
    else if(entity.tags.indexOf('bullet') !== -1) {
        ctx.moveTo(0, 0); //TODO: figure out how to stop the nonstop polygon, then remove this
        ctx.arc(0, 0, 1, 0, Math.PI*2);
    } else if(entity.tags.indexOf('asteroid') !== -1)
        drawPolygon(ctx, asteroid[+entity.tags.find((tag) => tag.indexOf('asteroid-shape-') !== -1).slice(-1)]);
    else
        console.warn('No shape given to drawing entity');

    ctx.fill();

    ctx.restore();
};

export default drawEntity;
