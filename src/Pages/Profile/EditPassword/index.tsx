import React, { ReactElement } from 'react';

import PageTitle from '../../../Components/Title/PageTitle';
import PageContent from '../../../Sections/PageContent';
import EditPasswordForm from './EditPasswordForm';

const EditPassword: React.FC = (): ReactElement => {
  return (
    <PageContent
      loadingText="Profiel"
      content={
        <>
          <PageTitle title="Profiel" color="secondary" />
          <EditPasswordForm />
        </>
      }
    />
  );
};

export default EditPassword;
