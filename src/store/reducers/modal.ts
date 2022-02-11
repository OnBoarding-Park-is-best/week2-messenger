import { createReducer } from 'typesafe-actions';
import { SHOW_MODAL, CLOSE_MODAL } from '~store/actions/types';
import type { ModalActionType } from '~store/actions/modal';

export interface ModalStateType {
  showModal: boolean;
}

const INITIAL_STATE: ModalStateType = {
  showModal: false,
};

const modal = createReducer<ModalStateType, ModalActionType>(INITIAL_STATE, {
  [SHOW_MODAL]: (state) => ({ showModal: true }),
  [CLOSE_MODAL]: (state) => INITIAL_STATE,
});

export default modal;
