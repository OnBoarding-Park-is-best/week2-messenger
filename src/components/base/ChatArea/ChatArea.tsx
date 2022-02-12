import React from 'react';
import { COLORS } from '~constants/style';
import styled from 'styled-components';

interface ChatAreaProps {
  value: string;
  error: boolean;
  onChange: React.ChangeEventHandler;
  onKeyPress: React.KeyboardEventHandler;
}

const ChatArea = React.forwardRef<HTMLTextAreaElement, ChatAreaProps>(
  ({ value, error, onChange, onKeyPress }, ref) => {
    return (
      <ChatAreaContainer
        ref={ref}
        value={value}
        error={error}
        onChange={onChange}
        onKeyPress={onKeyPress}
        required
      />
    );
  },
);

const ChatAreaContainer = styled.textarea<ChatAreaProps>`
  display: block;
  width: 100%;
  padding: 0;
  padding-top: 4px;
  border: none;
  border-bottom: 1px solid
    ${(props) => (props.error ? COLORS.ERROR_COLOR : COLORS.PRIMARY)};
  background: none;
  font-size: 16px;
  color: #343434;
  overflow-y: hidden;
  line-height: 1.5;
  box-sizing: border-box;
  resize: none;
  outline: 0;
  &::placeholder {
    color: #8c8c8c;
  }
  &:disabled,
  &:disabled:hover {
    cursor: not-allowed;
    background-color: ${COLORS.GREY};
    transition: none;
  }
`;
export default ChatArea;
