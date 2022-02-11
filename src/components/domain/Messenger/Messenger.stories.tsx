import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '~store/actions/user';
import {
  INITIAL_USER,
  USER_BRADGO,
  USER_HYOCHOI,
  USER_KRUNGY,
} from '~constants/user';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Messenger from './Messenger';

export default {
  title: 'domain/Messenger',
  component: Messenger,
} as ComponentMeta<typeof Messenger>;

const Template: ComponentStory<typeof Messenger> = ({ loginUser }) => {
  return <Messenger loginUser={loginUser}></Messenger>;
};

export const HYO_CHOI = Template.bind({});
HYO_CHOI.args = {
  loginUser: USER_HYOCHOI,
};

export const BRADGO = Template.bind({});
BRADGO.args = {
  loginUser: USER_BRADGO,
};

export const KRUNGY = Template.bind({});
KRUNGY.args = {
  loginUser: USER_KRUNGY,
};
