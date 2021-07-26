import { Box } from '@material-ui/core';
import React, { ReactElement } from 'react';

import PageTitle from '../../Components/Title/PageTitle';
import SendEmailForm from '../ForgotPassword/SendEmailForm';

const ForgotPassword: React.FC = (): ReactElement => {
  return (
    <Box>
      <PageTitle title="Forgot Password?" color="secondary" />
      <SendEmailForm />
    </Box>
  );
};

export default ForgotPassword;
