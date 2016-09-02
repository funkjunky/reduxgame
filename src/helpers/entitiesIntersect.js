const dist = (p1, p2) => Math.sqrt(((p2.x - p1.x) * (p2.x - p1.x)) + ((p2.y - p1.y) * (p2.y - p1.y)));

const entitiesIntersect =
    (entityA, entityB) => {
        //brand new entities can't collide with anything
        if(entityA.lifetime < 300 || entityB.lifetime < 300)
            return false;
        else
            return dist(entityA.position, entityB.position) <= entityA.size + entityB.size;
    };

export default entitiesIntersect;
