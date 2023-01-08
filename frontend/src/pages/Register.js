import React from 'react';
import { Message } from 'semantic-ui-react';
import { registerNewUser } from '../helper/utils';
import RegForm from '../components/Register/RegForm';
import Wrapper from '../helper/components/Wrapper';

function Register() {
  return (
    <Wrapper minWidthPx={350} computer={6} textAlign="center">
      <RegForm
        fetchFn={registerNewUser}
        color="teal"
        title="Regisztrációs űrlap"
        button="Regisztráció"
      />
      <Message data-testid="message">
        Ha már regisztrált felhasználó,
        <a data-testid="message-link" href="/login">
          {' '}
          kattintson ide a bejelentkezéshez.
        </a>
      </Message>
    </Wrapper>
  );
}

export default Register;
