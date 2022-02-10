import { createReducer } from 'typesafe-actions';
import { SHOW_MODAL, CLOSE_MODAL } from '~store/actions/types';
import type { ModalActionType } from '~store/actions/modal';

export interface ModalStateType {
  showModal: boolean;
}

const INITIAL_STATE: ModalStateType = {
  showModal: true,
};

const modal = createReducer<ModalStateType, ModalActionType>(INITIAL_STATE, {
  [SHOW_MODAL]: (state) => INITIAL_STATE,
  [CLOSE_MODAL]: (state) => ({ showModal: false }),
});

export default modal;
