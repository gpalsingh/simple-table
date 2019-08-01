import { combineReducers } from 'redux';

import subjects from './subjects';
import periods from './periods';
import swReducer from './serviceWorker';
import settings from './settings';

export default combineReducers({
  subjects,
  periods,
  sw: swReducer,
  settings
});