import { combineReducers } from 'redux';
import modal from './modal';
import user from './user';
import messages from './message';

const rootReducer = combineReducers({
  modal,
  user,
  messages,
});

export default rootReducer;

export type RootStateType = ReturnType<typeof rootReducer>;
