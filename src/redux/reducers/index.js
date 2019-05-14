import { combineReducers } from 'redux';

import subjects from './subjects';
import periods from './periods';

export default combineReducers({
  subjects,
  periods
});