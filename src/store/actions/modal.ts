import { ActionType, createAction } from 'typesafe-actions';
import { SHOW_MODAL, CLOSE_MODAL } from '~store/actions/types';

export const showModal = createAction(SHOW_MODAL)();
export const closeModal = createAction(CLOSE_MODAL)();

const actions = { showModal, closeModal };
export type ModalActionType = ActionType<typeof actions>;
