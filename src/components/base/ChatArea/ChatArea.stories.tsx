import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from 'styled-components';
import ChatArea from './ChatArea';

export default {
  title: 'base/ChatArea',
  component: ChatArea,
} as ComponentMeta<typeof ChatArea>;

const Template: ComponentStory<typeof ChatArea> = (args) => (
  <Wrapper>
    <ChatArea {...args} />
  </Wrapper>
);

export const Default = Template.bind({});
Default.args = {
  width: 320,
  height: 20,
  name: 'ChatArea',
  error: false,
  isBottom: true,
};

export const Error = Template.bind({});
Error.args = {
  width: 320,
  height: 20,
  name: 'ChatArea',
  error: true,
  isBottom: true,
};

const Wrapper = styled.div`
  height: 320px;
  position: relative;
  border: 1px solid black;
`;
