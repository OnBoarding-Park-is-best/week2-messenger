import { useState } from 'react';
import styled from 'styled-components';
import { Avatar, Button, Input } from '~components/base';
import { AvatarSizeEnum } from '~types/index';

interface LoginProps {
  src: string;
}

const Login = ({ src }: LoginProps) => {
  const [userNameValue, setUserNameValue] = useState('');

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserNameValue(e.target.value);
  };

  return (
    <LoginContainer>
      <Title>유저 정보 입력</Title>
      <ProfileContainer>
        <AvatarContainer>
          <Avatar src={src} alt="profile picture" size={AvatarSizeEnum.Large} />
          <Button contained={false} onClick={() => {}}>
            프로필 사진 변경
          </Button>
        </AvatarContainer>
        <UserNameConatiner>
          <span>이름</span>
          <Input
            width="100%"
            height="52px"
            name="Login Input"
            value={userNameValue}
            onChange={handleUserName}
            error={false}
          />
          <SubmitButtonContainer>
            <Button contained={true} onClick={() => {}}>
              확인
            </Button>
          </SubmitButtonContainer>
        </UserNameConatiner>
      </ProfileContainer>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 767px;
  height: 439px;
  background: #ffffff;
  box-shadow: 8px 42px 80px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 42px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -383.5px;
  margin-top: -219.5px;
`;

const Title = styled.h1`
  font-size: 32px;
  text-align: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const UserNameConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  margin-top: -72px;
  width: 288px;
  position: relative;

  > span {
    font-size: 16px;
    line-height: 1.5;
  }
`;

const SubmitButtonContainer = styled.div`
  position: absolute;
  bottom: -85px;
  right: 0;
`;
export default Login;
