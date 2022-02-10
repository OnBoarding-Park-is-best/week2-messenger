import { createReducer } from 'typesafe-actions';
import {
  ADD_MESSAGE,
  DELETE_MESSAGE,
  INIT_MESSAGES,
} from '~store/actions/types';
import { INITIAL_MESSAGES } from '~constants/message';
import type { MessageType } from '~types/index';
import type { MessageActionType } from '~store/actions/message';

export type MessageStateType = {
  messages: MessageType[];
};

const INITIAL_STATE: MessageStateType = {
  messages: INITIAL_MESSAGES,
};

const messages = createReducer<MessageStateType, MessageActionType>(
  INITIAL_STATE,
  {
    [INIT_MESSAGES]: (state) => INITIAL_STATE,
    [ADD_MESSAGE]: (state, action) => ({
      messages: [...state.messages, action.payload],
    }),
    [DELETE_MESSAGE]: (state, action) => ({
      messages: state.messages.filter(
        ({ messageId }) => messageId !== action.payload.messageId,
      ),
    }),
  },
);

export default messages;
