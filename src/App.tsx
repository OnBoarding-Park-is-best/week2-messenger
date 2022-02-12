import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Messenger, Login } from '~components/domain';
import { RootStateType } from '~store/reducers';
import useAccess from '~hooks/useAccess';
import { v4 as uuid } from 'uuid';
import DefaultProfile from '~assets/defaultUser.png';

function App() {
  const { user } = useSelector((state: RootStateType) => state.user);
  const [loginNameValue, setLoginNameValue] = useState<string>('');
  const [loginProfileValue, setLoginProfileValue] =
    useState<string>(DefaultProfile);
  const [isLoginError, setIsLoginError] = useState(false);
  const { handleUserLogin } = useAccess();

  const handleLoginNameValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLoginNameValue(e.target.value);
  };

  const handleLoginProfileValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      const file = URL.createObjectURL(e.target.files[0]);
      setLoginProfileValue(file);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      userId: uuid(),
      userName: loginNameValue,
      profileImage: loginProfileValue,
    };
    if (newUser.userName) {
      handleUserLogin(newUser);
    } else {
      setIsLoginError(true);
    }
  };

  return (
    <Container>
      {!user.userName ? (
        <Login
          src={loginProfileValue}
          value={loginNameValue}
          onChange={handleLoginNameValueChange}
          onSubmit={handleLoginSubmit}
          onUploadChange={handleLoginProfileValueChange}
          isError={isLoginError}
        />
      ) : (
        <Messenger loginUser={user} width="780px" height="100vh" />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

export default App;
