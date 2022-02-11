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
  const { handleDelete, handleReply, chatMessage, setChatMessage } =
    useMessage();

  const [chatFormStyle, setChatFormStyle] = useState<boolean>(false);
  // const [chatMessage, setChatMessage] = useState<string>('');
  const chatContainer = useRef<HTMLDivElement>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setChatMessage(e.target.value);
  }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 제출할 때 보내는 메세지, 로그인 시에 유저 정보만 따로 업데이트 하는 게 좋을지?
    const message: MessageType = {
      userId: user.userId,
      userName: user.userName,
      profileImage: user.profileImage,
      messageId: uuid(),
      content: chatMessage,
      date: new Date(),
    };
    if (chatMessage === '') {
      setChatFormStyle(true);
      setTimeout(() => {
        setChatFormStyle(false);
      }, 1000);
    } else {
      dispatch(addMessage(message));
      setChatMessage('');
    }
  };

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
          <ChatForm chatFormStyle={chatFormStyle}>
            <ChatLabel>
              Message
              <ChatArea
                width="100%"
                height=""
                name="ChatArea"
                value={chatMessage}
                error={false}
                isBottom={true}
                onChange={handleChange}
              />
            </ChatLabel>
            <Icon name="send" size={36} onClick={handleSubmit} />
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

const wiggling = keyframes`
  0% {
    transform: rotate(0deg);
  }
  10%{
    transform: rotate(10deg);
  }
  20%{
    transform: rotate(-10deg);
  }
  30%{
    transform: rotate(5deg);
  }
  40%{
    transform: rotate(-5deg);
  }
  50%{
    transform: rotate(2.5deg);
  }
  60%{
    transform: rotate(-2.5deg);
  }
  70%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(0deg);
  }
`;

const ChatForm = styled.form<{ chatFormStyle: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 6px 12px;
  border: 1px solid ${COLORS.PRIMARY};
  border-radius: 30px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  ${(props) =>
    props.chatFormStyle
      ? css`
          border: 1px solid red;
          animation: ${wiggling} 1s;
        `
      : css`
          animation: none;
        `}
`;

const ChatLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-item: flex-start;
  width: 100%;
  margin: 0 10px;
  font-size: 12px;
  color: ${COLORS.PRIMARY};
`;

export default Messenger;
