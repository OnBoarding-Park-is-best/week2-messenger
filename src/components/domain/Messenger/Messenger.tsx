import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '~store/reducers';
import { USER_BRADGO } from '~constants/user';
import { AvatarSizeEnum } from '~types/components';
import {
  Avatar,
  Button,
  Icon,
  ChatArea,
  MainContainer,
} from '~components/base';
import { COLORS } from '~constants/style';
import styled from 'styled-components';

const Messenger = () => {
  console.log(USER_BRADGO);
  return (
    <MainContainer width="60vw" height="100vh">
      <StyledNav>
        <StyledChatUser>
          <Avatar
            src={USER_BRADGO.profileImage}
            alt="user avatar image"
            size={AvatarSizeEnum.Medium}
          />
          <StyledChatTitle>{USER_BRADGO.userName}의 채팅방</StyledChatTitle>
        </StyledChatUser>
        <Button children="나가기" contained={false} onClick={() => {}} />
      </StyledNav>
      <ChatRoom></ChatRoom>
      <ChatField>
        <ChatArea></ChatArea>
        <Icon name="send" />
      </ChatField>
    </MainContainer>
  );
};

const StyledNav = styled.nav`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 2px solid ${COLORS.PRIMARY};
`;

const StyledChatUser = styled.div`
  display: flex;
  align-items: flex-end;
`;

const StyledChatTitle = styled.h2`
  margin-left: 12px;
  font-size: 1.6rem;
  color: ${COLORS.PRIMARY};
  line-height: 1.46;
`;

export default Messenger;
