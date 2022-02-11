import React from 'react';
import { Send, Reply, Delete } from './IconConverter';
import styled from 'styled-components';

interface IconProps {
  name: string;
  size: number;
  onClick?: React.MouseEventHandler;
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
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    opacity: 60%;
  }
`;

export default Icon;
