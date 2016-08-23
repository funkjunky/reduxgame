import { combineReducers } from 'redux';

import keys from './keys.js';
import mouse from './mouse.js';

const input = combineReducers({
    keys,
    mouse,
});

export default input;
