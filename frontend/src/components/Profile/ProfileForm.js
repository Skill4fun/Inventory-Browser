import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button, Form, Icon, Input, Segment, Modal, Message, Header,
} from 'semantic-ui-react';
import { resendEmailVerification } from '../../helper/utils';

const fieldWidth = 16;

export default function ProfileForm({
  fetchFn,
  getDataFromTokenFn,
  loggedInUserContextFn,
  color,
  title,
  button,
}) {
  const {
    register, reset, watch, handleSubmit, setError, setValue, getValues, formState: {
      errors, isDirty, dirtyFields, isValid, isSubmitSuccessful,
    },
  } = useForm(
    {
      reValidateMode: 'onChange',
      criteriaMode: 'all',
      shouldFocusError: true,
      mode: 'onChange',
      defaultValues: {
        name: '',
        email: '',
        newPassword: '',
        password2: '',
        currentPassword: '',
      },
    },
  );

  const [open, setOpen] = React.useState(false);
  const { loggedInUser, setLoggedInUser } = loggedInUserContextFn();

  const [resendResult, setResendResult] = useState('');

  const submitForm = async (formData) => {
    const dirtyData = {};
    Object.keys(dirtyFields).forEach((field) => { dirtyData[field] = formData[field]; });
    dirtyData.token = localStorage.browserTableToken;

    const result = await fetchFn(dirtyData);
    if (result.status === 400) setError('email', { type: 'systemErrorMessage', message: result.message });
    if (result.status === 401) setError('name', { type: 'systemErrorMessage', message: result.message });
    if (result.status === 200) {
      setLoggedInUser(getDataFromTokenFn(result.token));
      localStorage.setItem('browserTableToken', result.token);

      setTimeout(() => {
        setOpen(false);
        reset();
      }, 1500);
    }
  };

  const handleResendEmail = async () => {
    setResendResult('pending');
    const result = await resendEmailVerification(loggedInUser.userId);
    if (result.status === 200) {
      setResendResult('success');
    } else {
      setResendResult('error');
    }
  };

  React.useEffect(() => {
    if (!dirtyFields.newPassword) setValue('password2', '', { shouldDirty: true });
  }, [dirtyFields.newPassword]);

  React.useEffect(() => {
    if (!open) reset();
  }, [open]);

  const items = [];
  if (dirtyFields?.name) items.push(`Új felhasználónév: ${getValues('name')}`);
  if (dirtyFields?.email) items.push(`Új email: ${getValues('email')}`);
  if (dirtyFields?.newPassword) items.push('Új Jelszó');

  return (
    <>
      <Header data-testid="header-testid" as="h2">{title}</Header>
      <Segment raised padded color={(!isDirty) ? 'teal' : color} size="large">
        <Header
          as="h4"
          textAlign="center"
          style={{
            marginBottom: 20,
            marginLeft: 30,
            marginRight: 30,
          }}
        >
          Módosítsa adatait a megfelelő mező(k) kitöltésével:
        </Header>

        <Form error success noValidate size="large" onSubmit={handleSubmit(submitForm)}>
          <Form.Field width={fieldWidth} error={!!errors.name}>
            <Input iconPosition="left">
              <input
                data-testid="username"
                type="text"
                name="name"
                placeholder={loggedInUser.name}
                id="name"
                {...register('name')}
              />
              <Icon
                name="user"
                color={dirtyFields.name && 'orange'}
              />
            </Input>
          </Form.Field>

          <Form.Field width={fieldWidth} error={!!errors.email}>
            <Input iconPosition="left">
              <input
                data-testid="email"
                type="email"
                name="email"
                placeholder={loggedInUser.email}
                id="email"
                {...register('email', {
                  pattern: { // eslint-disable-next-line
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Kérjük érvényes email címet adjon meg!',
                  },
                })}
              />
              <Icon
                name="at"
                color={dirtyFields.email && 'orange'}
              />
            </Input>
          </Form.Field>

          <Form.Field width={fieldWidth} error={!!errors.newPassword}>
            <Input iconPosition="left">
              <input
                data-testid="newpassword"
                type="password"
                name="newPassword"
                placeholder="Új jelszó megadása"
                id="newPassword"
                {...register('newPassword', {
                  minLength: {
                    value: 8,
                    message: 'A jelszónak legalább 8 karakterből kell állnia!',
                  },
                  deps: ['newPassword', 'password2'],
                  validate: (value) => value === watch('password2') || 'A megadott jelszópár nem azonos!',
                })}
              />
              <Icon
                name="key"
                color={dirtyFields.newPassword && 'orange'}
              />
            </Input>
          </Form.Field>

          {dirtyFields.newPassword
            && (
              <Form.Field width={fieldWidth} error={!!errors.password2}>
                <Input iconPosition="left">
                  <input
                    data-testid="newpassword2"
                    type="password"
                    name="password2"
                    placeholder="Adja meg újra a jelszót"
                    id="password2"
                    {...register('password2', {
                      minLength: {
                        value: 8,
                        message: 'A jelszónak legalább 8 karakterből kell állnia!',
                      },
                      deps: ['newPassword', 'password2'],
                      validate: (value) => value === watch('newPassword') || 'A megadott jelszópár nem azonos!',
                    })}
                  />
                  <Icon
                    name="key"
                    color="orange"
                  />
                </Input>
              </Form.Field>
            )}

          <Modal
            data-testid="confirmation-popup"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
              (
                <Button
                  type="button"
                  data-testid="update-button"
                  color={(isDirty && isValid) ? 'teal' : 'red'}
                  disabled={!(isDirty && isValid)}
                >
                  <Button.Content>
                    {Object.keys(errors).length
                      ? (errors[Object.keys(errors)[0]].message)
                      : button}
                  </Button.Content>
                </Button>
              )
            }
            size="mini"
          >
            <Segment textAlign="center" raised color={(!isDirty) ? 'teal' : color} size="large">
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
                    header="Sikeres profil frissítés! :)"
                    size="huge"
                  />
                )}
              {(!isSubmitSuccessful && !Object.keys(errors).length)
                && (
                  <Message warning size="large">
                    <Message.Header>
                      Az alábbi adatokat módosítjuk:
                    </Message.Header>
                    <Message.List items={items} />
                  </Message>
                )}

              <Form.Field
                style={{
                  marginBottom: 10,
                }}
                error={!!errors.currentPassword}
              >
                {(!Object.keys(errors).length && isSubmitSuccessful !== true)
                  && (
                    <Input iconPosition="left" fluid>
                      <input
                        type="password"
                        name="currentPassword"
                        placeholder="Aktuális jelszó a megerősítéshez."
                        id="currentPassword"
                        {...register('currentPassword')}
                      />
                      <Icon
                        name="key"
                        color="orange"
                      />
                    </Input>
                  )}
              </Form.Field>

              <Form.Field>
                {(!Object.keys(errors).length && isSubmitSuccessful !== true)
                  && (
                    <Button
                      type="submit"
                      data-testid="register-button"
                      color={(isDirty && isValid) ? 'teal' : 'red'}
                      disabled={!(dirtyFields.currentPassword)}
                      onClick={handleSubmit(submitForm)}
                    >
                      <Button.Content>
                        Megerősítés!
                      </Button.Content>
                    </Button>
                  )}
                {isSubmitSuccessful !== true
                  && (
                    <Button
                      color="red"
                      onClick={() => setOpen(false)}
                    >
                      <Icon name="cancel" />
                      Mégse
                    </Button>
                  )}
              </Form.Field>
            </Segment>
          </Modal>

        </Form>

      </Segment>

      {!(loggedInUser?.isVerified)
        && (
          <Segment color="blue">
            <Header icon>
              <Icon name="envelope" color="blue" />
              Kérjük erősítse meg email címét
            </Header>
            <p>Megerősítő email újbóli elküldése</p>
            <Button
              onClick={handleResendEmail}
              color="blue"
            >
              <Icon name="redo" loading={resendResult === 'pending'} />
              Elküld
            </Button>

            <Message
              hidden={!resendResult || resendResult === 'pending'}
              success={resendResult === 'success'}
              error={resendResult === 'error'}
              icon
            >
              <Icon name={resendResult === 'success' ? 'check' : 'times'} />
              <Message.Content>
                {resendResult === 'success' ? 'Verifikációs email elküldve' : 'Hálózati hiba...'}
              </Message.Content>
            </Message>
          </Segment>
        )}

    </>
  );
}
