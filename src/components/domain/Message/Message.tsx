import React from 'react';
import styled from 'styled-components';
import { Avatar, Icon } from '~components/base';
import { COLORS } from '~constants/index';
import { MessageType } from '~types/index';
import { dateToFormattedString } from '~utils/index';

interface MessageProps {
  me?: boolean;
  message: MessageType;
  onReply: React.MouseEventHandler;
  onDelete: React.MouseEventHandler;
}

const Message = ({ message, me = false, onReply, onDelete }: MessageProps) => {
  const { messageId, userName, profileImage, content, date } = message;
  return (
    <Container me={me} data-message-id={messageId}>
      <InnerContainer me={me}>
        <AvatarContainer>
          <Avatar src={profileImage} alt={`${userName} avatar`} />
        </AvatarContainer>
        <Wrapper>
          <p>
            <NameContainer>{`${me ? '*' : ''}${userName}`}</NameContainer>
            <DateContainer>{dateToFormattedString(date)}</DateContainer>
          </p>
          <MessageContainer data-is-message={true}>{content}</MessageContainer>
          <ButtonContainer>
            <Icon name="reply" size={16} onClick={onReply} />
            <Icon name="delete" size={12} onClick={onDelete} />
          </ButtonContainer>
        </Wrapper>
      </InnerContainer>
    </Container>
  );
};

interface ContainerProps {
  me: boolean;
}

const Container = styled.article<ContainerProps>`
  display: flex;
  justify-content: ${({ me }) => (me ? 'flex-end' : 'flex-start')};
  align-items: center;
  width: 100%;
`;

const InnerContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: ${({ me }) => (me ? 'row-reverse' : 'row')};
  justify-content: ${({ me }) => (me ? 'flex-end' : 'flex-start')};
  gap: 0.5em;
  align-items: flex-end;
  width: 60%;

  @media screen and (max-width: 767px) {
    width: 80%;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2em;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;

const NameContainer = styled.span`
  margin-right: 1em;
  font-weight: 500;
  line-height: 1.4em;
`;

const DateContainer = styled.span`
  color: #888;
  line-height: 1.4em;
  margin-right: 1em;
`;

const MessageContainer = styled.div`
  width: 100%;
  padding: 1.5em 1em;
  background-color: ${COLORS.GREY};
  border-radius: 15px;
  word-break: break-all;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5em;
  height: 2em;
`;

export default Message;
