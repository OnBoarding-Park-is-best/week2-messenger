import React from 'react';
import { Send, Reply, Delete } from './IconConverter';
import styled, { css } from 'styled-components';

interface IconProps {
  name: string;
  size: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
interface Icons {
  [key: string]: ({ size }: IconProps) => JSX.Element;
}

const icons: Icons = {
  send: Send,
  reply: Reply,
  delete: Delete,
};

const Icon = ({ name, size, onClick }: IconProps) => {
  const SpecificIcon = icons[name];
  return (
    <StyledIcon name={name} size={size} onClick={onClick}>
      <SpecificIcon name={name} size={size} />
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
          width: ${props.size - 1}px;
          height: ${props.size - 1}px;
          &:active {
            background-color: rgba(0, 0, 0, 0.4);
          }
        `
      : css`
          width: ${props.size + 8}px;
          height: ${props.size + 8}px;
          &:hover {
            box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2);
          }
          &:active {
            background-color: rgba(0, 0, 0, 0.1);
          }
        `}
`;

export default Icon;
