import React, { ReactElement } from 'react';

import PageHeaderWithoutButton from '../../../Components/Header/PageHeaderWithoutBtn';
import PageContent from '../../Sections/PageContent';
import EditPasswordForm from './EditPasswordForm';

const EditPassword: React.FC = (): ReactElement => {
  return (
    <PageContent
      loadingText="Profiel"
      content={
        <>
          <PageHeaderWithoutButton title="Profiel" />
          <EditPasswordForm />
        </>
      }
    />
  );
};

export default EditPassword;
