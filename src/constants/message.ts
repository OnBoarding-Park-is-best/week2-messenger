import { v4 as uuid } from 'uuid';
import { USER_BRADGO, USER_HYOCHOI, USER_KRUNGY } from './user';
import type { MessageType } from '~types/index';

export const INITIAL_MESSAGE: MessageType = {
  userId: '',
  userName: '',
  profileImage: '',
  messageId: '',
  content: '',
  date: new Date('Febrary 10, 2022 18:29:00'),
};

export const INITIAL_MESSAGES: MessageType[] = [
  {
    ...USER_BRADGO,
    messageId: uuid(),
    content: '1',
    date: new Date('Febrary 10, 2022 18:29:00'),
  },
  {
    ...USER_HYOCHOI,
    messageId: uuid(),
    content: '2',
    date: new Date('Febrary 10, 2022 18:30:00'),
  },
  {
    ...USER_KRUNGY,
    messageId: uuid(),
    content: '3',
    date: new Date('Febrary 10, 2022 18:30:50'),
  },
  {
    ...USER_BRADGO,
    messageId: uuid(),
    content: '4',
    date: new Date('Febrary 10, 2022 18:35:00'),
  },
  {
    ...USER_KRUNGY,
    messageId: uuid(),
    content: '5',
    date: new Date('Febrary 10, 2022 18:38:00'),
  },
];
