import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { showModal, closeModal } from '~store/actions/modal';
import { login, logout } from '~store/actions/user';
import { UserType } from '~types/data';

const useAccess = () => {
  const dispatch = useDispatch();

  const handleUserLogin = useCallback(
    (user: UserType) => {
      dispatch(login(user));
    },
    [dispatch],
  );

  const handleClickLogoutBtn = useCallback(
    (e: React.MouseEvent) => {
      dispatch(
        showModal({
          isModalOpen: true,
          content: '정말 로그아웃 하시겠습니까?',
          onSubmit: handleUserLogout,
        }),
      );
    },
    [dispatch],
  );

  const handleUserLogout = useCallback(() => {
    dispatch(logout());
    dispatch(closeModal());
  }, [dispatch]);

  return {
    handleClickLogoutBtn,
    handleUserLogin,
  };
};

export default useAccess;
