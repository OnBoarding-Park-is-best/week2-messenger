// import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from './Input';

export default {
  title: 'base/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: 320,
  height: 52,
  onChange: () => {},
  name: 'Login Input',
  error: false,
};

export const Error = Template.bind({});
Error.args = {
  width: 320,
  height: 52,
  onChange: () => {},
  name: 'Login Input',
  error: true,
};
