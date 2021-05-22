import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import LogInForm from '../../Components/Form/LogInForm';
import ProgressComponent from '../../Components/Progress';
import { selectAppLoading } from '../../store/appState/selectors';
import { selectToken } from '../../store/user/selectors';
import TopSection from './TopSection';

const LogIn: React.FC = (): ReactElement => {
  const history = useHistory();
  const token = useSelector(selectToken);
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    if (token) history.push('/programma');
  }, [token, history]);

  return (
    <Box>
      <TopSection />
      {isLoading ? <ProgressComponent /> : <LogInForm />}
    </Box>
  );
};

export default LogIn;
