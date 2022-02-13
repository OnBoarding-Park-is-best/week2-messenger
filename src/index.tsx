import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '~store/index';
import App from './App';
import GlobalStyle from '~styles/globals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
