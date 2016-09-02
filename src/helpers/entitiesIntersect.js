import polygonsIntersect from './polygonsintersect.js';
import getWorldPolygon from './getworldpolygon.js';

const dist = (p1, p2) => Math.sqrt(((p2.x - p1.x) * (p2.x - p1.x)) + ((p2.y - p1.y) * (p2.y - p1.y)));

const entitiesIntersect =
    (entityA, entityB) => {
        //brand new entities can't collide with anything
        if(entityA.lifetime < 300 || entityB.lifetime < 300)
            return false;
        else
        //if(entityA.draw.shape === 'circle' && entityB.draw.shape === 'circle')
            return dist(entityA.position, entityB.position) <= entityA.draw.size + entityB.draw.size;
/*
        else if(entityA.draw.shape === 'circle')
            return getWorldPolygon(entityB).some((line) => lineCircle(line[0], line[1], [entityA.position.x, entityA.position.y], entityA.draw.size));
        else if(entityB.draw.shape === 'circle')
            return getWorldPolygon(entityA).some((line) => lineCircle(line[0], line[1], [entityB.position.x, entityB.position.y], entityB.draw.size));
        else
            return polygonsIntersect(getWorldPolygon(entityA), getWorldPolygon(entityB));
*/
    };

export default entitiesIntersect;
