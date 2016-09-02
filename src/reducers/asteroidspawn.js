const asteroidSpawn = (state = 0, {type, dt}) => (type === 'increment_timer')
    ? state + dt
    : state;

export default asteroidSpawn;
