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
  if (dirtyFields?.name) items.push(`??j felhaszn??l??n??v: ${getValues('name')}`);
  if (dirtyFields?.email) items.push(`??j email: ${getValues('email')}`);
  if (dirtyFields?.newPassword) items.push('??j Jelsz??');

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
          M??dos??tsa adatait a megfelel?? mez??(k) kit??lt??s??vel:
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
                    message: 'K??rj??k ??rv??nyes email c??met adjon meg!',
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
                placeholder="??j jelsz?? megad??sa"
                id="newPassword"
                {...register('newPassword', {
                  minLength: {
                    value: 8,
                    message: 'A jelsz??nak legal??bb 8 karakterb??l kell ??llnia!',
                  },
                  deps: ['newPassword', 'password2'],
                  validate: (value) => value === watch('password2') || 'A megadott jelsz??p??r nem azonos!',
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
                    placeholder="Adja meg ??jra a jelsz??t"
                    id="password2"
                    {...register('password2', {
                      minLength: {
                        value: 8,
                        message: 'A jelsz??nak legal??bb 8 karakterb??l kell ??llnia!',
                      },
                      deps: ['newPassword', 'password2'],
                      validate: (value) => value === watch('newPassword') || 'A megadott jelsz??p??r nem azonos!',
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
                    header="Sikeres profil friss??t??s! :)"
                    size="huge"
                  />
                )}
              {(!isSubmitSuccessful && !Object.keys(errors).length)
                && (
                  <Message warning size="large">
                    <Message.Header>
                      Az al??bbi adatokat m??dos??tjuk:
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
                        placeholder="Aktu??lis jelsz?? a meger??s??t??shez."
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
                        Meger??s??t??s!
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
                      M??gse
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
              K??rj??k er??s??tse meg email c??m??t
            </Header>
            <p>Meger??s??t?? email ??jb??li elk??ld??se</p>
            <Button
              onClick={handleResendEmail}
              color="blue"
            >
              <Icon name="redo" loading={resendResult === 'pending'} />
              Elk??ld
            </Button>

            <Message
              hidden={!resendResult || resendResult === 'pending'}
              success={resendResult === 'success'}
              error={resendResult === 'error'}
              icon
            >
              <Icon name={resendResult === 'success' ? 'check' : 'times'} />
              <Message.Content>
                {resendResult === 'success' ? 'Verifik??ci??s email elk??ldve' : 'H??l??zati hiba...'}
              </Message.Content>
            </Message>
          </Segment>
        )}

    </>
  );
}
