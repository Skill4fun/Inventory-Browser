import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Icon, Input, Segment, Message, Header,
} from 'semantic-ui-react';
import { getDataFromToken } from '../../helper/utils';

const fieldWidth = 16;

function LoginForm({ handleLogin, setLoggedInUser }) {
  const navigate = useNavigate();

  const {
    register, reset, handleSubmit, setError, formState: { errors, isSubmitSuccessful },
  } = useForm(
    {
      reValidateMode: 'onChange',
      criteriaMode: 'all',
      shouldFocusError: true,
    },
  );

  const submitForm = async (formData) => {
    const result = await handleLogin(formData);
    if (result.status === 200) {
      setLoggedInUser(getDataFromToken(result.token));
      localStorage.setItem('browserTableToken', result.token);
      navigate('/main');
      reset();
    } else {
      setError('email', { type: 'systemErrorMessage', message: result.message });
    }
  };

  return (
    <>
      <Header as="h2">Bejelentkezés</Header>
      <Segment raised padded color="teal" size="large">
        <Form data-testid="login-form" error success noValidate size="large" onSubmit={handleSubmit(submitForm)}>

          {Object.keys(errors).length
            ? (
              <Message
                error
                content={errors[Object.keys(errors)[0]].message}
              />
            )
            : isSubmitSuccessful
            && (
              <Message
                success
                content="Successful login!"
                size="huge"
              />
            )}

          <Form.Field width={fieldWidth} error={!!errors.email}>
            <Input iconPosition="left">
              <input
                type="email"
                name="email"
                placeholder="Email"
                id="email"
                {...register('email', {
                  required: 'Minden mező kitöltése kötelező!',
                  pattern: {
                    // eslint-disable-next-line max-len
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Érvénytelen emailcím!',
                  },
                })}
              />
              <Icon name="at" />
            </Input>
          </Form.Field>

          <Form.Field width={fieldWidth} error={!!errors.password}>
            <Input iconPosition="left">
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                {...register('password', {
                  required: 'Minden mező kitöltése kötelező!',
                })}
              />
              <Icon name="key" />
            </Input>
          </Form.Field>

          <Form.Field>
            <Button data-testid="login-button" color="teal">Bejelentkezés</Button>
          </Form.Field>
        </Form>
      </Segment>

      <Message>
        Ha még nincs hozzáférésed,
        {' '}
        <a href="/register">kattints ide a regisztrációhoz.</a>
      </Message>
    </>
  );
}

export default LoginForm;
