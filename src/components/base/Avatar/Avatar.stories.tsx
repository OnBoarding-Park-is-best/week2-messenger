import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Avatar from './Avatar';
import { AvatarSizeEnum } from '~types/index';

export default {
  title: 'base/Avatar',
  component: Avatar,
  args: {
    src: 'https://avatars.githubusercontent.com/u/57004991?v=4',
    alt: 'user avatar image',
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Small = Template.bind({});
Small.args = {
  size: AvatarSizeEnum.Small,
};

export const Medium = Template.bind({});
Medium.args = {
  size: AvatarSizeEnum.Medium,
};

export const Large = Template.bind({});
Large.args = {
  size: AvatarSizeEnum.Large,
};

export const Custom = Template.bind({});
Custom.args = {
  width: '200px',
};
