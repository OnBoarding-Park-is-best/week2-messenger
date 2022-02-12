import { USER_BRADGO, USER_HYOCHOI, USER_KRUNGY } from '~constants/user';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Messenger from './Messenger';
import useAccess from '~hooks/useAccess';

export default {
  title: 'domain/Messenger',
  component: Messenger,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Messenger>;

const Template: ComponentStory<typeof Messenger> = ({
  width,
  height,
  loginUser,
}) => {
  const { handleUserLogin } = useAccess();
  handleUserLogin(loginUser);

  return (
    <Messenger width={width} height={height} loginUser={loginUser}></Messenger>
  );
};

export const HYO_CHOI = Template.bind({});
HYO_CHOI.args = {
  loginUser: USER_HYOCHOI,
  width: '60vw',
  height: '100vh',
};

export const BRADGO = Template.bind({});
BRADGO.args = {
  loginUser: USER_BRADGO,
};
BRADGO.parameters = {
  viewport: {
    defaultViewport: 'mobile2',
  },
};

export const KRUNGY = Template.bind({});
KRUNGY.args = {
  loginUser: USER_KRUNGY,
};
KRUNGY.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};
