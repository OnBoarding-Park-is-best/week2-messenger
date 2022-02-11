import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Children } from 'react';
import Messenger from './Messenger';

export default {
  title: 'domain/Messenger',
  component: Messenger,
} as ComponentMeta<typeof Messenger>;

const Template: ComponentStory<typeof Messenger> = () => {
  return <Messenger></Messenger>;
};

export const Default = Template.bind({});
Default.args = {};
