import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface ChatAreaProps {
  width: number;
  height: number;
  name: string;
  value: string;
  error: boolean;
  isBottom: boolean;
  onChange: React.ChangeEventHandler;
}

const ChatArea = ({
  width,
  height,
  name,
  value,
  error,
  isBottom,
  onChange,
  ...props
}: ChatAreaProps) => {
  const areaRef = useRef<HTMLTextAreaElement>(null);
  let status: string = '';

  if (error) {
    status = 'error';
  }

  const ChatAreaStyle: React.CSSProperties = {
    width: width,
    height: height,
  };

  const BottomFixedStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
  };

  const handleOnChange = useCallback(
    (e: React.ChangeEvent) => {
      onChange(e);
    },
    [onChange],
  );

  useEffect(() => {
    if (areaRef.current) {
      areaRef.current.style.height = '1px';
      areaRef.current.style.height = areaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  return (
    <ChatAreaContainer
      ref={areaRef}
      value={value}
      onChange={handleOnChange}
      name={name}
      className={status || undefined}
      style={
        isBottom ? { ...ChatAreaStyle, ...BottomFixedStyle } : ChatAreaStyle
      }
      {...props}
    />
  );
};

const ChatAreaContainer = styled.textarea`
  display: block;
  box-sizing: border-box;
  resize: none;
  overflow-y: hidden;
  border: none;
  border-bottom: 1px solid #3e72f6;
  outline: 0;
  background: white;
  padding: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #343434;
  &::placeholder {
    color: #8c8c8c;
  }
  &:disabled,
  &:disabled:hover {
    cursor: not-allowed;
    background-color: #f3f3f3;
    transition: none;
  }
  &.error {
    border-color: #f53354;
  }
`;
export default ChatArea;
