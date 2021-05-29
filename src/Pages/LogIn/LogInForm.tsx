import { Avatar, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';

import SubmitButtonComponent from '../../Components/Button/SubmitButton';
import FormContainer from '../../Components/Form/FormContainer';
import PasswordFieldComponent from '../../Components/Form/PasswordField';
import TextFieldComponent from '../../Components/Form/TextFieldComponent';
import { ILogInCredentials } from '../../models/credentials.model';
import { ButtonEvent } from '../../models/events.model';
import { userLogIn } from '../../store/user/actions';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    margin: 'auto',
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const LogInForm: React.FC = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [logInCredentials, setLogInCredentials] = useState<ILogInCredentials>({
    email: '',
    password: '',
  });

  const submitForm = (e: ButtonEvent): void => {
    e.preventDefault();
    dispatch(userLogIn(logInCredentials));
    setLogInCredentials({
      email: '',
      password: '',
    });
  };

  const updateLoginCredentials = (event: React.ChangeEvent<HTMLInputElement>) =>
    setLogInCredentials({
      ...logInCredentials,
      [event.target.id]: event.target.value,
    });

  return (
    <FormContainer
      formContent={
        <>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <TextFieldComponent
            id="email"
            label="Email Address"
            value={logInCredentials.email}
            onChange={updateLoginCredentials}
          />
          <PasswordFieldComponent
            id="password"
            label="Password"
            value={logInCredentials.password}
            onChange={updateLoginCredentials}
          />
          <SubmitButtonComponent caption="LOG IN" color="primary" handleClick={submitForm} />
        </>
      }
    />
  );
};

export default LogInForm;
