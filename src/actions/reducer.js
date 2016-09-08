import { REDUCER } from '../constants/actions.js';

export const reset = () => ({ type: REDUCER.RESET });

export const addScore = (score) => ({ type: REDUCER.ADD_SCORE, score });
