import styled from 'styled-components';

interface InputProps {
  width: number;
  height: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  error: boolean;
}

const Input = ({
  width,
  height,
  onChange,
  name,
  error,
  ...props
}: InputProps) => {
  let status: string = '';

  if (error) {
    status = 'error';
  }

  const inputStyle: React.CSSProperties = {
    width: width,
    height: height,
  };

  return (
    <InputContainer
      width={width}
      height={height}
      onChange={onChange}
      name={name}
      className={status || undefined}
      style={{ ...inputStyle }}
      {...props}
    />
  );
};

const InputContainer = styled.input`
  display: block;
  box-sizing: border-box;
  padding: 0 16px; //
  border-radius: 12px;
  border: 1px solid #3e72f6;
  font-size: 16px;
  background-color: #fff;
  outline: none;

  &::placeholder {
    color: #8c8c8c;
  }

  &:hover {
    transition: background-color 0.2s;
    background-color: #f1f6f9;
  }

  &:focus {
    border: 2px solid #3e72f6;
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

export default Input;
