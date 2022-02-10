import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './Button';

export default {
  title: 'base/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ({ children, ...args }) => {
  return <Button {...args}>{children}</Button>;
};

export const Profile = Template.bind({});
Profile.args = {
  children: '프로필 사진 변경',
  onClick: () => {},
};

export const Confirm = Template.bind({});
Confirm.args = {
  children: '확인',
  fill: true,
  onClick: () => {},
};

export const Exit = Template.bind({});
Exit.args = {
  children: '나기기',
  onClick: () => {},
};
