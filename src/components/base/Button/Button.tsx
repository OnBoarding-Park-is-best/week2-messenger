import { ReactChild } from 'react';
import { COLORS } from '~constants/style';
import styled, { css } from 'styled-components';

interface ButtonProps {
  children: ReactChild;
  fill?: boolean;
  onClick: () => void;
}

const Button = ({ children, fill = false, onClick, ...props }: ButtonProps) => {
  return (
    <StyledButton type="button" fill={fill} onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
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
    ${(props) =>
      props.fill
        ? css`
            background-color: ${COLORS.WHITE};
            color: ${COLORS.PRIMARY};
          `
        : css`
            background-color: ${COLORS.PRIMARY};
            color: ${COLORS.WHITE};
          `}
  }
  &:active {
    ${(props) =>
      props.fill
        ? css`
            background-color: ${COLORS.PRIMARY};
            color: ${COLORS.WHITE};
            box-shadow: inset: 2px 2px 2px rgba(0, 0, 0, 0.8);
          `
        : css`
            background-color: ${COLORS.PRIMARY_STRONG};
            color: ${COLORS.WHITE};
            box-shadow: inset: 2px 2px 2px rgba(0, 0, 0, 0.8);
          `}
  }
`;

export default Button;
