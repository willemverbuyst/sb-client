import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import PageTitle from '../../Components/Title/PageTitle';
import { selectToken } from '../../store/user/selectors';
import PageContent from '../Sections/PageContent';
import LoginForm from './LoginForm';

const Login: React.FC = (): ReactElement => {
  const history = useHistory();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) history.push('/programma');
  }, [token, history]);

  return (
    <PageContent
      loadingText="Login"
      content={
        <>
          <PageTitle title="Login" color="secondary" />
          <LoginForm />
        </>
      }
    />
  );
};

export default Login;
