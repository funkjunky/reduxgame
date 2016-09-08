import { ROTATION } from '../constants/actions.js';

export const setRotationVectorFromEntity = (x, y, filter) => ({ type: ROTATION.SET_FROM_TO, x, y, filter });
