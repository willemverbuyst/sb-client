import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SignUpForm from '../../Components/Form/SingUpForm';
import PageHeaderWithoutButton from '../../Components/PageHeader/PageHeaderWithoutBtn';
import ProgressComponent from '../../Components/Progress';
import { selectAppLoading } from '../../store/appState/selectors';
import { selectToken } from '../../store/user/selectors';
import { selectUser } from '../../store/user/selectors';

const SignUp: React.FC = (): ReactElement => {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectAppLoading);
  const history = useHistory();

  useEffect(() => {
    if (!token) history.push('/login');
  }, [token]);

  useEffect(() => {
    if (user && !user.admin) history.push('/page-not-found');
  });

  return (
    <Box>
      <PageHeaderWithoutButton text="Sign Up" />
      {isLoading ? <ProgressComponent /> : <SignUpForm />}
    </Box>
  );
};

export default SignUp;
