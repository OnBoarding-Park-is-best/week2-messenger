import { v4 as uuid } from 'uuid';
import { USER_BRADGO, USER_HYOCHOI, USER_KRUNGY } from './user';
import type { MessageType } from '~types/index';

export const INITIAL_MESSAGES: MessageType[] = [
  {
    ...USER_BRADGO,
    messageId: uuid(),
    content: '안녕하세요 여러분!!',
    date: new Date('Febrary 10, 2022 18:29:00'),
  },
  {
    ...USER_HYOCHOI,
    messageId: uuid(),
    content: '이번 주도 화이팅입니다~',
    date: new Date('Febrary 10, 2022 18:30:00'),
  },
  {
    ...USER_KRUNGY,
    messageId: uuid(),
    content: '안녕하세요 😇',
    date: new Date('Febrary 10, 2022 18:30:50'),
  },
  {
    ...USER_BRADGO,
    messageId: uuid(),
    content: '이번 SWIT 과제 재밌네요^^',
    date: new Date('Febrary 10, 2022 18:35:00'),
  },
  {
    ...USER_KRUNGY,
    messageId: uuid(),
    content: '💩',
    date: new Date('Febrary 10, 2022 18:38:00'),
  },
];
