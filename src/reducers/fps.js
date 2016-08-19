//TODO: think of a stateless way to calculate FPS smoothly. Per frame simply isn't accurate enough.
const fps = (state = 0, action) => 1000 / action.dt;

export default fps;
