import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '~store/reducers/index';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import GlobalStyle from '~styles/globals';

const store = createStore(rootReducer);

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <GlobalStyle />
      <Story />
    </Provider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
    },
  },
};
