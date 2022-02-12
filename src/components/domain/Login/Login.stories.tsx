import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import Login from './Login';

export default {
  title: 'domain/Login',
  component: Login,
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = () => {
  const [userNameValue, setUserNameValue] = useState('');
  const [isError, SetIsError] = useState(false);
  const [image, setImage] = useState('https://picsum.photos/300/600');

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserNameValue(e.target.value);
  };

  const handleOnSubmit = () => {
    if (userNameValue.length) {
      SetIsError(false);
      alert('전송 완료');
    } else {
      SetIsError(true);
    }
  };

  const onUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = URL.createObjectURL(e.target.files[0]);
      setImage(file);
    }
  };

  return (
    <Login
      src={image}
      value={userNameValue}
      onChange={handleUserName}
      onSubmit={handleOnSubmit}
      onUploadChange={onUploadChange}
      isError={isError}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
