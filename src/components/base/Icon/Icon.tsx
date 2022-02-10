import { ReactChild } from 'react';
import { Send, Reply, Delete } from './Icons';
import styled, { css } from 'styled-components';

interface IconProps {
  name: string;
  size: number;
  onClick: () => void;
}

const Icon = ({ name, size, onClick }: IconProps) => {
  return (
    <StyledIcon name={name} size={size} onClick={onClick}>
      {name === 'send' ? (
        <Send size={size} />
      ) : name === 'reply' ? (
        <Reply size={size} />
      ) : (
        <Delete size={size} />
      )}
    </StyledIcon>
  );
};

const StyledIcon = styled.button<IconProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  z-index: 10;
  ${(props) =>
    props.name === 'send'
      ? css`
          width: ${props.size}px;
          height: ${props.size}px;
        `
      : css`
          width: ${props.size + 4}px;
          height: ${props.size + 4}px;
        `}

  &:active {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export default Icon;
