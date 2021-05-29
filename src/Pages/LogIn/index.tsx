import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import PageHeaderWithoutButton from '../../Components/Header/PageHeaderWithoutBtn';
import ProgressComponent from '../../Components/Progress';
import { selectAppLoading } from '../../store/appState/selectors';
import { selectToken } from '../../store/user/selectors';
import LoginForm from './LoginForm';

const LogIn: React.FC = (): ReactElement => {
  const history = useHistory();
  const token = useSelector(selectToken);
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    if (token) history.push('/programma');
  }, [token, history]);

  return (
    <Box>
      <PageHeaderWithoutButton title="Login" />
      {isLoading ? <ProgressComponent /> : <LoginForm />}
    </Box>
  );
};

export default LogIn;
