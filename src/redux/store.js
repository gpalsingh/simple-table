import { persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createStore } from 'redux';
import storage from 'redux-persist/lib/storage';
import reducers from './reducers';

/* Redux devtools */
let redux_enhancer;
if (process.env.NODE_ENV === "development") {
  redux_enhancer = composeWithDevTools();
}

const persistConfig = {
  key: 'simpleTable',
  version: 1,
  storage,
  blacklist: ['sw'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

/* Create store */
const store = createStore(
  persistedReducer,
  redux_enhancer
);

export default store;