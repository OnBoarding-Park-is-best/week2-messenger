import { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from './Modal';

export default {
  title: 'domain/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleModalVisible = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      <button onClick={handleModalVisible}>Button</button>
      <Modal
        width="270px"
        visible={isVisible}
        onClose={handleModalVisible}
        onSubmit={handleModalVisible}
      >
        모달 테스트
      </Modal>
    </>
  );
};

export const Default = Template.bind({});
