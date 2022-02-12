import React, { useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import type { RootStateType } from '~store/reducers';
import { closeModal } from '~store/actions/modal';

interface ModalProps {
  width: string;
}

const Modal = ({ width, ...props }: ModalProps) => {
  const { isModalOpen, content, onSubmit } = useSelector(
    (state: RootStateType) => state.modal,
  );
  const dispatch = useDispatch();
  const containerStyle: React.CSSProperties = {
    width: width,
  };

  const handleClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      };
    }
  }, [isModalOpen]);

  return (
    <>
      <ModalContainer
        visible={isModalOpen}
        {...props}
        style={{ ...containerStyle }}
      >
        <ContentWrapper>{content}</ContentWrapper>
        <Divider />
        <ButtonWrapper>
          <button onClick={onSubmit}>예</button>
          <button onClick={handleClose}>아니오</button>
        </ButtonWrapper>
      </ModalContainer>
      <BackgroundDim onClick={handleClose} visible={isModalOpen} />
    </>
  );
};

interface ModalStyleProps {
  visible: boolean;
}

const BackgroundDim = styled.div<ModalStyleProps>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000b2;
  z-index: 1000;
`;

const ModalContainer = styled.div<ModalStyleProps>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: rgb(0 0 0 / 10%) 0px 12px 40px -12px;
  border-radius: 12px;
  box-sizing: border-box;
  text-align: center;
  word-break: keep-all;
  z-index: 1001;
`;

const ContentWrapper = styled.div`
  padding: 42px 32px;
  text-align: center;
`;

const Divider = styled.hr`
  box-sizing: border-box;
  border: 0;
  background: #c4c4c4;
  height: 1px;
  width: 100%;
  margin: 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 48px;
  > button {
    display: inline-block;
    width: 50%;
    height: 100%;
    color: #3e72f6;
    :first-of-type {
      border-right: 1px solid #c4c4c4;
    }
  }
`;

export default Modal;
