import React, { useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '~store/reducers';
import { closeModal, showModal } from '~store/actions/modal';
import { deleteMessage } from '~store/actions/message';
import {
  ellipsisString,
  removeSpecialCharacters,
  getOriginMessage,
} from '~utils/message';

const useMessage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootStateType) => state.user);
  const [chatMessage, setChatMessage] = useState<string>('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

      setChatMessage(
        `${userName}에게 답장\n상대방의 말 : ${ellipsisString(
          message,
        )}\n\n(회신)\n`,
      );
      inputRef.current?.focus();
    },
    [user],
  );

  return {
    handleDelete,
    handleReply,
    chatMessage,
    setChatMessage,
    inputRef,
  };
};

export default useMessage;
