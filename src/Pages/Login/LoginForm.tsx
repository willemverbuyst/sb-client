import { Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';

import AvatarIconComponent from '../../Components/Avatar/AvatarIcon';
import SubmitButtonComponent from '../../Components/Button/SubmitButton';
import FormContainer from '../../Components/Form/FormContainer';
import PasswordFieldComponent from '../../Components/Form/PasswordField';
import TextFieldComponent from '../../Components/Form/TextField';
import * as HISTORY from '../../history';
import { ILogInCredentials } from '../../models/credentials.model';
import { userLogIn } from '../../store/user/action-creators';

const LoginForm: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const [logInCredentials, setLogInCredentials] = useState<ILogInCredentials>({
    email: '',
    password: '',
  });

  const submitForm = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
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
      inputFields={
        <>
          <AvatarIconComponent icon={<LockOutlinedIcon />} />
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
        </>
      }
      submitButton={
        <SubmitButtonComponent
          caption="LOG IN"
          color="primary"
          handleClick={submitForm}
        />
      }
      link={
        <Link href="#" onClick={HISTORY.gotoForgotPassword}>
          Forgot Password?
        </Link>
      }
    />
  );
};

export default LoginForm;
