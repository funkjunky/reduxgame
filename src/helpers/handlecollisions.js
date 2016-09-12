import crossFilter from './crossfilter.js';
import entitiesIntersect from './entitiesintersect.js';

const intersection = (arr1, arr2) => arr1.filter((value) => arr2.indexOf(value) !== -1);
const handleCollisions = (entities, QueueAction) => {
    let canCollide = crossFilter(
        entities,
        (a, b) =>
            a.onCollision.some((event) =>
                event.tags.some((tag) => b.tags.indexOf(tag) != -1)) //has a matching tag to the collision event
    );
    canCollide.filter(([a, b]) => entitiesIntersect(a,b))
        .forEach(([entityA, entityB]) => 
            entityA.onCollision.find((event) => intersection(event.tags, entityB.tags).length > 0).cb(entityA, entityB, QueueAction)
        );
};

export default handleCollisions;
