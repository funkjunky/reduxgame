const drawPlayer = (ctx, entity) => {
    ctx.save();

    let polygon = [
        [-5, -10],
        [-5, -5],
        [5, -5],
        [5, -10],
        [10, 0],
        [0, 10],
        [-10, 0],
        [-5, -10],
    ];

    //translate the context to the center of the drawing
    ctx.translate(entity.position.x, entity.position.y);
    ctx.rotate(entity.rotation + Math.PI / 2);

    ctx.beginPath();
    //move the pen to the first point and remove that point
    const first = polygon.splice(0, 1);
    ctx.moveTo(first[0], first[1]);

    //draw the polygon, line by line, in order.
    polygon.forEach(([x, y]) => ctx.lineTo(x, y));

    ctx.fill();

    ctx.restore();
};

export default drawPlayer;
