const getNewAsteroid = (entities) => {
    let shape = getAsteroidPoints();
    let pos = getRandomPointNotTouching(store.getState().entities);
}

export default getNewAsteroid;
