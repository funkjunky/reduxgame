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
    ctx.scale(entity.draw.size, entity.draw.size);

    switch(entity.draw.shape) {
        case 'polygon':
            drawPolygon(ctx, entity.draw.points); break;
        case 'circle':
            ctx.moveTo(0, 0); //TODO: figure out how to stop the nonstop polygon, then remove this
            ctx.arc(0, 0, 1, 0, Math.PI*2); break;
        default:
            console.warn('No shape given to drawing entity');
    }

    ctx.fill();

    ctx.restore();
};

export default drawEntity;
