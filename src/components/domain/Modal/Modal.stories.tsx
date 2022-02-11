import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '~store/reducers';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from './Modal';
import { showModal } from '~store/actions/modal';

export default {
  title: 'domain/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = () => {
  const { isModalOpen, content, onSubmit } = useSelector(
    (state: RootStateType) => state.modal,
  );
  const dispatch = useDispatch();

  const handleModalVisible = () => {
    dispatch(
      showModal({
        isModalOpen: true,
        content: `메시지를 삭제하시겠습니까?`,
        onSubmit: () => {},
      }),
    );
  };

  return (
    <>
      <button onClick={handleModalVisible}>Button</button>
      <Modal width="270px" />
    </>
  );
};

export const Default = Template.bind({});
