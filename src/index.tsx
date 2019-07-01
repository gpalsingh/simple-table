import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import * as serviceWorker from './serviceWorker';

import App from './components/App';
import reducers from './redux/reducers';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

let redux_enhancer;
if (process.env.NODE_ENV === "development") {
  redux_enhancer = composeWithDevTools();
}
const store = createStore(
  reducers,
  redux_enhancer
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();