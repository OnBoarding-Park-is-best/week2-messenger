import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { RootStateType } from '~store/reducers';
import { addMessage } from '~store/actions/message';
import { login, logout } from '~store/actions/user';
import { closeModal, showModal } from '~store/actions/modal';
import { MessageType, UserType } from '~types/data';
import { AvatarSizeEnum } from '~types/components';
import useMessage from '~hooks/useMessage';
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
  loginUser: UserType;
}

// 유저를 입력받으면 로그인
const Messenger = ({ loginUser }: MessengerType) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootStateType) => state.user);
  const { messages } = useSelector((state: RootStateType) => state.messages);
  const { handleDelete, handleReply, chatMessage, setChatMessage, inputRef } =
    useMessage();

  const [chatFormError, setChatFormError] = useState<boolean>(false);
  const chatContainer = useRef<HTMLDivElement>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setChatMessage(e.target.value);
  }, []);

  const handleErrorEffect = useCallback(() => {
    setChatFormError(true);
    setTimeout(() => {
      setChatFormError(false);
    }, 1000);
  }, []);

  const handleBtnSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      chatMessage === '' ? handleErrorEffect() : submitForm();
    },
    [user, chatMessage],
  );

  const handleUserKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatMessage === '' ? handleErrorEffect() : submitForm();
      }
    },
    [user, chatMessage],
  );

  const submitForm = useCallback(() => {
    const message: MessageType = {
      userId: user.userId,
      userName: user.userName,
      profileImage: user.profileImage,
      messageId: uuid(),
      content: chatMessage,
      date: new Date(),
    };
    dispatch(addMessage(message));
    setChatMessage('');
  }, [user, chatMessage]);

  // 나가기 버튼 클릭 시 로그아웃
  const handleClickLogoutBtn = useCallback(
    (e: React.MouseEvent) => {
      dispatch(
        showModal({
          isModalOpen: true,
          content: '정말 로그아웃 하시겠습니까?',
          onSubmit: handleLogout,
        }),
      );
    },
    [dispatch],
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
    dispatch(closeModal());
  }, [dispatch]);

  // 유저 정보를 받아서 로그인
  useEffect(() => {
    dispatch(login(loginUser));
  }, []);

  // 메세지가 보내지면 자동 스크롤
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
    <MainContainer width="60vw" height="100vh">
      <Modal width="30em" />
      <Wrapper>
        {/* 유저 프로필, 이름, 나가기 버튼 */}
        <Nav>
          <User>
            <Avatar
              src={user.profileImage}
              alt="user avatar image"
              size={AvatarSizeEnum.Medium}
            />
            <Title>{user.userName}의 채팅방</Title>
          </User>
          <Button
            children="나가기"
            contained={false}
            onClick={handleClickLogoutBtn}
          />
        </Nav>
        {/* 채팅 목록이 담기는 곳 */}

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

        {/* 메세지 입력 폼 */}
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
              />
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
  width: 100%;
  height: 100%;
  padding: 16px;
`;

const Nav = styled.nav`
  position: sticky:
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
`;

const ChatContainer = styled.div`
  height: 80%;
  padding: 20px;
  overflow-y: auto;
`;

const ChatFormContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px 20px 30px;
  background: ${COLORS.WHITE};
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
`;

const ChatLabel = styled.label<{ chatFormError: boolean }>`
  display: flex;
  flex-direction: column;
  align-item: flex-start;
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
