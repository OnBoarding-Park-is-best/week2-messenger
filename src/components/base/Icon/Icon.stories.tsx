import { ComponentStory, ComponentMeta } from '@storybook/react';
import Icon from './Icon';

export default {
  title: 'base/Button',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = ({ ...args }) => {
  return <Icon {...args}></Icon>;
};

export const Send = Template.bind({});
Send.args = {
  name: 'send',
  size: 36,
  onClick: () => {},
};

export const Reply = Template.bind({});
Reply.args = {
  name: 'reply',
  size: 16,
  onClick: () => {},
};

export const Delete = Template.bind({});
Delete.args = {
  name: 'delete',
  size: 12,
  onClick: () => {},
};
