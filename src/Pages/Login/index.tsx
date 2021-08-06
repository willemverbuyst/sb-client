import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MessageComponent from '../../Components/Communication/Message';
import PageTitle from '../../Components/Title/PageTitle';
import PageContent from '../../Sections/PageContent';
import { selectAppLoading } from '../../store/appState/selectors';
import { selectToken } from '../../store/user/selectors';
import LoginForm from './LoginForm';

const Login: React.FC = (): ReactElement => {
  const history = useHistory();
  const token = useSelector(selectToken);
  const isLoading = useSelector(selectAppLoading);
  useEffect(() => {
    if (token) history.push('/programma');
  }, [token, history]);

  return (
    <PageContent
      loadingText=""
      content={
        <>
          <PageTitle title="Login" color="secondary" />
          {isLoading ? (
            <MessageComponent message="Logging in ..." />
          ) : (
            <LoginForm />
          )}
        </>
      }
    />
  );
};

export default Login;
