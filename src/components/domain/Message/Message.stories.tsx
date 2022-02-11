import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { INITIAL_MESSAGES } from '~constants/index';
import Message from './Message';
import { Modal } from '~components/domain';
import useMessage from '~hooks/useMessage';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '~store/reducers';
import { initMessage } from '~store/actions/message';

export default {
  title: 'domain/Message',
  component: Message,
  args: {
    message: INITIAL_MESSAGES[1],
  },
} as ComponentMeta<typeof Message>;

const Template: ComponentStory<typeof Message> = (args) => {
  const {
    handleClickDelete,
    handleDelete,
    handleReply,
    handleClose,
    isModalOpen,
    modalContent,
  } = useMessage();
  return (
    <>
      <Message {...args} onReply={handleReply} onDelete={handleClickDelete} />
      <Modal
        width="50vw"
        visible={isModalOpen}
        onSubmit={handleDelete}
        onClose={handleClose}
      >
        {modalContent}
      </Modal>
    </>
  );
};

export const MyMessage = Template.bind({});
MyMessage.args = {
  me: true,
};

export const OthersMessage = Template.bind({});

export const Messages = () => {
  const {
    handleClickDelete,
    handleDelete,
    handleReply,
    handleClose,
    isModalOpen,
    modalContent,
  } = useMessage();
  const { messages } = useSelector((state: RootStateType) => state.messages);
  const dispatch = useDispatch();
  return (
    <>
      <button
        style={{ border: '1px solid #999', padding: '0.5em 1em' }}
        onClick={() => dispatch(initMessage())}
      >
        상태 RESET
      </button>
      {messages.map((message) => (
        <Message
          key={message.messageId}
          message={message}
          me={message.userName === 'hyo-choi'}
          onReply={handleReply}
          onDelete={handleClickDelete}
        />
      ))}
      <Modal
        width="30em"
        visible={isModalOpen}
        onSubmit={handleDelete}
        onClose={handleClose}
      >
        {modalContent}
      </Modal>
    </>
  );
};
