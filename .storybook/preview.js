import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import GlobalStyle from '~styles/globals';

export const decorators = [
  (Story) => (
    <div>
      <GlobalStyle />
      <Story />
    </div>
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
