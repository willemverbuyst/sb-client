import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import PageHeaderWithoutButton from '../../../Components/Header/PageHeaderWithoutBtn';
import ProgressComponent from '../../../Components/Progress';
import { selectAppLoading } from '../../../store/appState/selectors';
import { selectToken } from '../../../store/user/selectors';
import EditPasswordForm from './EditPasswordForm';

const EditPassword: React.FC = (): ReactElement => {
  const token = useSelector(selectToken);
  const history = useHistory();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    if (!token) history.push('/login');
  });

  return (
    <Box>
      <PageHeaderWithoutButton title="Profiel" />

      {isLoading ? <ProgressComponent /> : <EditPasswordForm />}
    </Box>
  );
};

export default EditPassword;
