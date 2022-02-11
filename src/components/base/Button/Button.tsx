import React, { ReactChild } from 'react';
import { COLORS } from '~constants/style';
import styled, { css } from 'styled-components';

interface ButtonProps {
  children: ReactChild;
  fill: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ children, fill, onClick, ...props }: ButtonProps) => {
  return (
    <StyledButton
      type="button"
      fill={fill ? 1 : 0}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  padding: 18px 20px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.43;
  border: 1px solid ${COLORS.PRIMARY};
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  ${(props) =>
    props.fill
      ? css`
          background-color: ${COLORS.PRIMARY};
          color: ${COLORS.WHITE};
        `
      : css`
          color: ${COLORS.PRIMARY};
        `}
  &:hover {
    transition: all 0.1s ease-in;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
    ${(props) =>
      props.fill
        ? css`
            background-color: ${COLORS.PRIMARY_STRONG};
            color: ${COLORS.WHITE};
          `
        : css`
            background-color: ${COLORS.PRIMARY_SOFT};
          `}
  }
  &:active {
    ${(props) =>
      props.fill
        ? css`
            background-color: #3b61bf;
            box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.4),
              0px 2px 4px rgba(0, 0, 0, 0.3);
          `
        : css`
            background-color: #e8ecfa;
            box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.1),
              0px 2px 4px rgba(0, 0, 0, 0.3);
          `}
  }
`;

export default Button;
