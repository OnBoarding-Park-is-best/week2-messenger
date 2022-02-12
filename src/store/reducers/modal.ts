import { createReducer } from 'typesafe-actions';
import { SHOW_MODAL, CLOSE_MODAL } from '~store/actions/types';
import type { ModalActionType } from '~store/actions/modal';

export interface ModalStateType {
  isModalOpen: boolean;
  content: string;
  onSubmit: React.MouseEventHandler;
}

const INITIAL_STATE: ModalStateType = {
  isModalOpen: false,
  content: '',
  onSubmit: () => {},
};

const modal = createReducer<ModalStateType, ModalActionType>(INITIAL_STATE, {
  [SHOW_MODAL]: (_, action) => ({ ...action.payload }),
  [CLOSE_MODAL]: (state) => INITIAL_STATE,
});

export default modal;
