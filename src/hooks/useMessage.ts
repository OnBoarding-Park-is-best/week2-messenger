import { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '~store/reducers';
import { closeModal, showModal } from '~store/actions/modal';
import { deleteMessage } from '~store/actions/message';
import { ellipsisString } from '~utils/message';

const useMessage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootStateType) => state.modal);
  const messageId = useRef('');
  const [content, setContent] = useState<string>('');

  const handleClickDelete = useCallback(
    (e: React.MouseEvent) => {
      const container: HTMLDivElement = (e.target as HTMLElement).closest(
        '[data-message-id]',
      )!;
      const messageContainer: HTMLDivElement =
        container.querySelector('[data-is-message]')!;
      messageId.current = container.dataset.messageId!;
      const message = messageContainer.innerText;
      setContent(`${ellipsisString(message)} 메시지를 삭제하시겠습니까?`);
      dispatch(showModal());
    },
    [dispatch],
  );

  const handleDelete = useCallback(() => {
    dispatch(deleteMessage({ messageId: messageId.current }));
    dispatch(closeModal());
    messageId.current = '';
  }, [dispatch]);

  const handleReply = useCallback(() => {
    // TODO: Message 상위 컴포넌트에서 구현 필요
    console.log('Reply clicked');
  }, []);

  const handleClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return {
    handleClickDelete,
    handleDelete,
    handleReply,
    handleClose,
    isModalOpen: state.showModal,
    modalContent: content,
  };
};

export default useMessage;
