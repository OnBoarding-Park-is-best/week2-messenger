import React from 'react';
import styled from 'styled-components';

interface MainContainerProps {
  width?: string;
  height?: string;
  children: React.ReactNode;
}

const MainContainer = ({
  width = '100%',
  height = '50vh',
  children,
}: MainContainerProps) => {
  return (
    <Container width={width} height={height}>
      {children}
    </Container>
  );
};

interface ContainerProps {
  width: string;
  height: string;
}

const Container = styled.main<ContainerProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: 12px;
  border-radius: 12px;
  box-shadow: 8px 42px 80px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 767px) {
    width: 100%;
    box-shadow: none;
  }
`;

export default MainContainer;
