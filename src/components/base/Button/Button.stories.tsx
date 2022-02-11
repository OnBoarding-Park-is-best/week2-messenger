import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './Button';

export default {
  title: 'base/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ({
  children,
  contained,
  onClick,
}) => {
  return (
    <Button contained={contained} onClick={onClick}>
      {children}
    </Button>
  );
};

export const Profile = Template.bind({});
Profile.args = {
  children: '프로필 사진 변경',
  contained: false,
  onClick: () => {},
};

export const Confirm = Template.bind({});
Confirm.args = {
  children: '확인',
  contained: true,
  onClick: () => {},
};

export const Exit = Template.bind({});
Exit.args = {
  children: '나가기',
  contained: false,
  onClick: () => {},
};
