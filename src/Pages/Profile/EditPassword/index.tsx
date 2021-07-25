import React, { ReactElement } from 'react';

import PageTitle from '../../../Components/Title/PageTitle';
import PageContent from '../../../Sections/PageContent';
import EditPasswordForm from './EditPasswordForm';

const EditPassword: React.FC = (): ReactElement => {
  return (
    <PageContent
      loadingText="Password"
      content={
        <>
          <PageTitle title="Password" color="primary" />
          <EditPasswordForm />
        </>
      }
    />
  );
};

export default EditPassword;
