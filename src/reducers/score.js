import { REDUCER } from '../constants/actions.js';

const score = (state = 0, action) => (action.type == REDUCER.ADD_SCORE)
    ? state + action.score
    : state;

export default score;
