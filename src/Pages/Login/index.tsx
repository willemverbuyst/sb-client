import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import PageTitle from '../../Components/Title/PageTitle';
import PageContent from '../../Sections/PageContent';
import { selectToken } from '../../store/user/selectors';
import LoginForm from './LoginForm';

const Login: React.FC = (): ReactElement => {
  const history = useHistory();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) history.push('/programma');
  }, [token, history]);

  return (
    <PageContent
      loadingText=""
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
