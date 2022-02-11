import { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from './Input';

export default {
  title: 'base/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = ({ error = false }) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <Input
      width={320}
      height={52}
      name="Login Input"
      value={value}
      onChange={handleChange}
      error={error}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  error: false,
};

export const Error = Template.bind({});
Error.args = {
  error: true,
};
