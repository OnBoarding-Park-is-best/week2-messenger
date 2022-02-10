import { ActionType, createAction } from 'typesafe-actions';
import {
  ADD_MESSAGE,
  DELETE_MESSAGE,
  INIT_MESSAGES,
} from '~store/actions/types';
import type { MessageType } from '~types/index';

export const initMessage = createAction(INIT_MESSAGES)();
export const addMessage = createAction(ADD_MESSAGE)<MessageType>();
export const deleteMessage = createAction(DELETE_MESSAGE)<MessageType>();

const actions = { initMessage, addMessage, deleteMessage };
export type MessageActionType = ActionType<typeof actions>;
