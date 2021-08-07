import { Box } from '@material-ui/core';
import React, { ReactElement } from 'react';

import PageTitle from '../../../Components/Title/PageTitle';
import EditPasswordForm from './EditPasswordForm';

const EditPassword: React.FC = (): ReactElement => {
  return (
    <Box>
      <PageTitle title="Password" color="primary" />
      <EditPasswordForm />
    </Box>
  );
};

export default EditPassword;
