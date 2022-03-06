import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '~store/reducers';
import { UserType } from '~types/data';
import { AvatarSizeEnum } from '~types/components';
import useMessage from '~hooks/useMessage';
import useAccess from '~hooks/useAccess';
import {
  Avatar,
  Button,
  Icon,
  ChatArea,
  MainContainer,
} from '~components/base';
import { Message, Modal } from '~components/domain';
import { COLORS } from '~constants/style';
import styled, { css, keyframes } from 'styled-components';

interface MessengerType {
  width?: string;
  height?: string;
  loginUser: UserType;
}

const Messenger = ({ loginUser, width, height }: MessengerType) => {
  const { user } = useSelector((state: RootStateType) => state.user);
  const { messages } = useSelector((state: RootStateType) => state.messages);
  const { handleClickLogoutBtn } = useAccess();
  const {
    handleChange,
    handleBtnSubmit,
    handleUserKeyPress,
    handleDelete,
    handleReply,
    submitForm,
    chatMessage,
    chatFormError,
    inputRef,
  } = useMessage();

  const chatContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainer) {
      chatContainer.current?.addEventListener('DOMNodeInserted', (event) => {
        const target = event.currentTarget as HTMLDivElement;
        target.scroll({
          top: target.scrollHeight,
          behavior: 'smooth',
        });
      });
    }
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = '1px';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, [chatMessage]);

  return (
    <MainContainer width={width} height={height}>
      <Modal width="30em" />
      <Wrapper>
        <Nav>
          <User>
            <Avatar
              src={user.profileImage}
              alt="user avatar image"
              size={
                Number(width) > 767
                  ? AvatarSizeEnum.Medium
                  : AvatarSizeEnum.Small
              }
            />
            <Title>{user.userName}의 채팅방</Title>
          </User>
          <Button
            children="나가기"
            contained={false}
            onClick={handleClickLogoutBtn}
          />
        </Nav>
        <ChatContainer ref={chatContainer}>
          {messages.map((message) => (
            <Message
              key={message.messageId}
              message={message}
              me={message.userName === user.userName}
              onReply={handleReply}
              onDelete={handleDelete}
            />
          ))}
        </ChatContainer>
        <ChatFormContainer>
          <ChatForm chatFormError={chatFormError} onSubmit={submitForm}>
            <ChatLabel chatFormError={chatFormError}>
              Message
              <ChatArea
                value={chatMessage}
                error={chatFormError}
                onKeyPress={handleUserKeyPress}
                onChange={handleChange}
                ref={inputRef}
              ></ChatArea>
            </ChatLabel>
            <Icon
              name="send"
              size={36}
              color={chatFormError ? COLORS.ERROR_COLOR : COLORS.PRIMARY}
              onClick={handleBtnSubmit}
            />
          </ChatForm>
        </ChatFormContainer>
      </Wrapper>
    </MainContainer>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 16px;
  @media screen and (max-width: 767px) {
    padding: 0;
  }
`;

const Nav = styled.nav`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 2px solid ${COLORS.PRIMARY};
`;

const User = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Title = styled.h2`
  margin-left: 12px;
  font-size: 1.6rem;
  color: ${COLORS.PRIMARY};
  line-height: 1.46;
  @media screen and (max-width: 767px) {
    margin-left: 6px;
    font-size: 1.2rem;
  }
`;

const ChatContainer = styled.div`
  height: 85%;
  padding: 20px;
  overflow-y: auto;
  scroll-margin: 10px 0;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background-color: ${COLORS.PRIMARY_SOFT};
    border-radius: 3px;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    box-shadow: inset 0px 0px 5px white;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    border: 2px solid transparent;
    background-color: rgba(62, 114, 246, 0.4);
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
  ::-webkit-scrollbar-button {
    background-color: darkblue;
    width: 20px;
    height: 10px;
  }
  @media screen and (max-width: 767px) {
    padding: 20px 0;
  }
`;

const ChatFormContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px 20px 30px;
  background: ${COLORS.WHITE};
  @media screen and (max-width: 767px) {
    padding: 10px 0 30px;
  }
`;

const ChatForm = styled.form<{ chatFormError: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 6px 12px;
  border: 1px solid ${COLORS.PRIMARY};
  border-radius: 30px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  ${(props) =>
    props.chatFormError
      ? css`
          border: 1px solid red;
          animation: ${wiggling} 1s;
        `
      : css`
          animation: none;
        `}
  @media screen and (max-width: 767px) {
    border: none;
    padding: 0;
    box-shadow: none;
  }
`;

const ChatLabel = styled.label<{ chatFormError: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin: 0 10px;
  font-size: 12px;
  color: ${(props) =>
    props.chatFormError ? COLORS.ERROR_COLOR : COLORS.PRIMARY};
`;

const wiggling = keyframes`
  0% {
    transform: rotate(0deg);
  }
  10%{
    transform: rotate(3deg);
  }
  20%{
    transform: rotate(-3deg);
  }
  30%{
    transform: rotate(2deg);
  }
  40%{
    transform: rotate(-2deg);
  }
  50%{
    transform: rotate(1deg);
  }
  60%{
    transform: rotate(-1deg);
  }
  70%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(0deg);
  }
`;

export default Messenger;
