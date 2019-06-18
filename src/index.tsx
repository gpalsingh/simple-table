import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/App';
import reducers from './redux/reducers';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

const store = createStore(
  reducers,
  composeWithDevTools()
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
