import { ActionType, createAction } from 'typesafe-actions';
import { USER_LOGIN, USER_LOGOUT } from '~store/actions/types';
import type { UserType } from '~types/index';

export const login = createAction(USER_LOGIN)<UserType>();
export const logout = createAction(USER_LOGOUT)();

const actions = { login, logout };
export type UserActionType = ActionType<typeof actions>;
