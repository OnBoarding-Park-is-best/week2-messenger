import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';
import ChatArea from './ChatArea';

export default {
  title: 'base/ChatArea',
  component: ChatArea,
} as ComponentMeta<typeof ChatArea>;

const Template: ComponentStory<typeof ChatArea> = ({ error = false }) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Wrapper>
      <ChatArea
        width={320}
        height={20}
        name="ChatArea"
        value={value}
        isBottom={true}
        onChange={handleChange}
        error={error}
      />
    </Wrapper>
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

const Wrapper = styled.div`
  height: 320px;
  position: relative;
  border: 1px solid black;
`;
