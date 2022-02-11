import { useRef } from 'react';
import styled from 'styled-components';

interface ChatAreaProps {
  width: number;
  height: number;
  name: string;
  value: string;
  error: boolean;
  isBottom: boolean;
}

const ChatArea = ({
  width,
  height,
  name,
  value,
  error,
  isBottom,
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

  const BottomFixedStyle: React.CSSProperties | null = isBottom
    ? {
        position: 'absolute',
        bottom: 0,
      }
    : // isBottom이 아닐때는 null 로 줘도 될까요? 혹은 type 정의에 '| null' 을 빼고 isBottom ? { ...적용할 스타일 } : {} 로 주는게 나을까요?
      null;

  const setNewSize = (): void => {
    if (areaRef.current) {
      console.log(areaRef.current.scrollHeight);
      areaRef.current.style.height = '1px';
      areaRef.current.style.height = areaRef.current.scrollHeight + 'px';
    }
  };

  // 이 방법으로 onChange 없이 textarea의 높이를 추적하려고 했는데, [areaRef.current?.scrollHeight] 에서 높이 변화를 인식하지 못합니다.
  // useEffect(() => {
  //   if (areaRef.current) {
  //     console.log(areaRef.current.scrollHeight);
  //     areaRef.current.style.height = '1px';
  //     areaRef.current.style.height = areaRef.current.scrollHeight + 'px';
  //   }
  // }, [areaRef.current?.scrollHeight]);

  return (
    <ChatAreaContainer
      ref={areaRef}
      value={value}
      onChange={() => setNewSize()}
      name={name}
      className={status || undefined}
      style={{ ...ChatAreaStyle, ...BottomFixedStyle }}
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
