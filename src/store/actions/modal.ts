import { ActionType, createAction } from 'typesafe-actions';
import { SHOW_MODAL, CLOSE_MODAL } from '~store/actions/types';
import type { ModalStateType } from '~store/reducers/modal';

export const showModal = createAction(SHOW_MODAL)<ModalStateType>();
export const closeModal = createAction(CLOSE_MODAL)();

const actions = { showModal, closeModal };
export type ModalActionType = ActionType<typeof actions>;
