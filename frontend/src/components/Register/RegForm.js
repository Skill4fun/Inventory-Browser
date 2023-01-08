import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Button, Form, Icon, Input, Segment, Message, Header,
} from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const fieldWidth = 16;

export default function RegForm({
  fetchFn, navigate = useNavigate(), color, title, button,
}) {
  const {
    register, reset, watch, handleSubmit, setError, formState: { errors, isSubmitSuccessful },
  } = useForm(
    {
      reValidateMode: 'onChange',
      criteriaMode: 'all',
      shouldFocusError: true,
    },
  );

  const submitForm = async (formData) => {
    const result = await fetchFn(formData);
    if (result.status === 400) setError('email', { type: 'systemErrorMessage', message: result.message });
    if (result.status === 401) setError('name', { type: 'systemErrorMessage', message: result.message });
    if (result.status === 200) {
      setTimeout(() => {
        navigate('/login');
        reset();
      }, 2000);
    }
  };

  return (
    <>
      <Header data-testid="header-testid" as="h2">{title}</Header>
      <Segment raised padded color={color} size="large">
        <Form error success noValidate size="large" onSubmit={handleSubmit(submitForm)}>

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
                header="Sikeres regisztráció!"
                content="Elküldtük a hitelesítő emailt, kérlek ellenőrizd az emaileidet!"
                size="huge"
              />
            )}

          <Form.Field width={fieldWidth} error={!!errors.name}>
            <Input iconPosition="left">
              <input
                type="text"
                name="name"
                placeholder="Username"
                id="name"
                {...register('name', { required: 'Név, email és jelszó megadása kötelező!' })}
              />
              <Icon name="user" />
            </Input>
          </Form.Field>

          <Form.Field width={fieldWidth} error={!!errors.email}>
            <Input iconPosition="left">
              <input
                type="email"
                name="email"
                placeholder="Email"
                id="email"
                {...register('email', {
                  required: 'Név, email és jelszó megadása kötelező!',
                  pattern: { // eslint-disable-next-line
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Kérjük érvényes emailt adjon meg.',
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
                  required: 'Név, email és jelszó megadása kötelező!',
                  minLength: {
                    value: 8,
                    message: 'A jelszónak minimum 8 karakterből kell állnia.',
                  },
                  deps: ['password', 'password2'],
                  validate: (value) => value === watch('password2') || 'A két jelszó nem egyezik!',
                })}
              />
              <Icon name="key" />
            </Input>
          </Form.Field>

          <Form.Field width={fieldWidth} error={!!errors.password2}>
            <Input iconPosition="left">
              <input
                type="password"
                name="password2"
                placeholder="Re-enter your password"
                id="password2"
                {...register('password2', {
                  required: 'Név, email és jelszó megadása kötelező!',
                  minLength: {
                    value: 8,
                    message: 'A jelszónak minimum 8 karakterből kell állnia.',
                  },
                  deps: ['password', 'password2'],
                  validate: (value) => value === watch('password') || 'A két jelszó nem egyezik!',
                })}
              />
              <Icon name="key" />
            </Input>
          </Form.Field>

          <Form.Field>
            <Button data-testid="register-button" color={color}>{button}</Button>
          </Form.Field>
        </Form>
      </Segment>

    </>
  );
}
