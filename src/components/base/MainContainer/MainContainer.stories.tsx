import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MainContainer from './MainContainer';

const STORY_ARRAY: string[] = Array(10).fill(
  'Lorem ipsum dolor sit amet, consectetur adipiscing',
);

export default {
  title: 'base/MainContainer',
  component: MainContainer,
  args: {
    children: (
      <ul>
        {STORY_ARRAY.map((one, idx) => (
          <li key={idx}>{one}</li>
        ))}
      </ul>
    ),
  },
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof MainContainer>;

const Template: ComponentStory<typeof MainContainer> = (args) => (
  <MainContainer {...args}></MainContainer>
);

export const Desktop = Template.bind({});
Desktop.args = {
  width: '60vw',
  height: '60vh',
};

export const LargeMobile = Template.bind({});
LargeMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2',
  },
};

export const SmallMobile = Template.bind({});
SmallMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};
