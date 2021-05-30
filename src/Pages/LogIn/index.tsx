import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import PageHeaderWithoutButton from '../../Components/Header/PageHeaderWithoutBtn';
import { selectToken } from '../../store/user/selectors';
import LoginForm from './LoginForm';

const Login: React.FC = (): ReactElement => {
  const history = useHistory();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) history.push('/programma');
  }, [token, history]);

  return (
    <>
      <PageHeaderWithoutButton title="Login" />
      <LoginForm />
    </>
  );
};

export default Login;
