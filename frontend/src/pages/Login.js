import React from 'react';
import Wrapper from '../helper/components/Wrapper';
import { useLoggedInUserContext } from '../helper/LoggedInUserContextProvider';
import { loginUser } from '../helper/utils';
import LoginForm from '../components/Login/LoginForm';

function Login() {
  const { setLoggedInUser } = useLoggedInUserContext();

  return (
    <Wrapper minWidthPx={350} computer={6} textAlign="center">
      <LoginForm handleLogin={loginUser} setLoggedInUser={setLoggedInUser} />
    </Wrapper>
  );
}

export default Login;
