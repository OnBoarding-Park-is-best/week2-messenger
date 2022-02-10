import { createReducer } from 'typesafe-actions';
import type { UserType } from '~types/index';
import { INITIAL_USER } from '~constants/user';
import { USER_LOGIN, USER_LOGOUT } from '~store/actions/types';
import type { UserActionType } from '~store/actions/user';

export interface UserStateType {
  user: UserType;
}

const INITIAL_STATE: UserStateType = {
  user: INITIAL_USER,
};

const user = createReducer<UserStateType, UserActionType>(INITIAL_STATE, {
  [USER_LOGOUT]: (state) => INITIAL_STATE,
  [USER_LOGIN]: (state, action) => ({ user: action.payload }),
});

export default user;
