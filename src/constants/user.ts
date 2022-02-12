import { v4 as uuid } from 'uuid';
import { UserType } from '~types/index';

export const INITIAL_USER: UserType = {
  userId: '',
  userName: '',
  profileImage: '',
};

export const USER_HYOCHOI: UserType = {
  userId: uuid(),
  userName: 'hyo-choi',
  profileImage: 'https://avatars.githubusercontent.com/u/57004991?v=4',
};

export const USER_BRADGO: UserType = {
  userId: uuid(),
  userName: 'brad-go',
  profileImage: 'https://avatars.githubusercontent.com/u/68905615?v=4',
};

export const USER_KRUNGY: UserType = {
  userId: uuid(),
  userName: 'ISOJ',
  profileImage: 'https://avatars.githubusercontent.com/u/71081893?v=4',
};
