/*
const getWorldPolygon =
    (entity) => entity.draw.points.map(
            (point) => [
                entity.position.x + point[0] * entity.draw.scale,
                entity.position.y + point[1] * entity.draw.scale
            ]);
*/
const getWorldPolygon = (entity) => {
    let lines = [];
    for(let i=0; i!=entity.draw.points.length; ++i) {
        let ps = entity.draw.points;
        lines.push([[ps[i][0], ps[i][1]], [ps[(i + 1) % ps.length][0], ps[(i + 1) % ps.length][1]]]);
    }
    return lines;
};

export default getWorldPolygon;
