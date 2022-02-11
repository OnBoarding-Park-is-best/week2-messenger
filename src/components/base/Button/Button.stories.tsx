import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './Button';

export default {
  title: 'base/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ({
  children,
  fill,
  onClick,
}) => {
  return (
    <Button fill={fill} onClick={onClick}>
      {children}
    </Button>
  );
};

export const Profile = Template.bind({});
Profile.args = {
  children: '프로필 사진 변경',
  fill: 0,
  onClick: () => {},
};

export const Confirm = Template.bind({});
Confirm.args = {
  children: '확인',
  fill: 1,
  onClick: () => {},
};

export const Exit = Template.bind({});
Exit.args = {
  children: '나가기',
  fill: 0,
  onClick: () => {},
};
