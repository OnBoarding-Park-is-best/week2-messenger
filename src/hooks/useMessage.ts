import React, { useState, useCallback, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '~store/reducers';
import { closeModal, showModal } from '~store/actions/modal';
import { addMessage, deleteMessage } from '~store/actions/message';
import {
  ellipsisString,
  removeSpecialCharacters,
  getOriginMessage,
} from '~utils/message';
import { MessageType } from '~types/data';

const useMessage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootStateType) => state.user);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatFormError, setChatFormError] = useState<boolean>(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

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

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      const container: HTMLDivElement = (e.target as HTMLElement).closest(
        '[data-message-id]',
      )!;
      const messageContainer: HTMLDivElement =
        container.querySelector('[data-is-message]')!;
      const messageId = container.dataset.messageId!;
      const message = messageContainer.innerText;

      const handleDelete = () => {
        dispatch(deleteMessage({ messageId }));
        dispatch(closeModal());
      };

      dispatch(
        showModal({
          isModalOpen: true,
          content: `${ellipsisString(message)} 메시지를 삭제하시겠습니까?`,
          onSubmit: handleDelete,
        }),
      );
    },
    [dispatch],
  );

  const handleReply = useCallback(
    (e: React.MouseEvent) => {
      const container: HTMLDivElement = (e.target as HTMLElement).closest(
        '[data-message-id]',
      )!;
      const messageContainer: HTMLDivElement =
        container.querySelector('[data-is-message]')!;
      const nameContainer: HTMLSpanElement =
        container.querySelector('[data-user-naem]')!;

      const userName: string =
        removeSpecialCharacters(nameContainer.innerText) === user.userName
          ? '나'
          : removeSpecialCharacters(nameContainer.innerText);
      const message: string = getOriginMessage(messageContainer.innerText);
      const replyform = `${userName}에게 답장\n상대방의 말 : ${ellipsisString(
        message,
      )}\n\n(회신)\n`;

      setChatMessage((prev) => replyform + prev);
      inputRef.current?.focus();
    },
    [user],
  );

  return {
    handleChange,
    handleBtnSubmit,
    handleUserKeyPress,
    handleDelete,
    handleReply,
    submitForm,
    chatMessage,
    chatFormError,
    inputRef,
  };
};

export default useMessage;
