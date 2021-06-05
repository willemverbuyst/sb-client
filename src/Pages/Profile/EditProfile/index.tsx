import React, { ReactElement } from 'react';

import PageHeaderWithoutButton from '../../../Components/Header/PageHeaderWithoutBtn';
import PageContent from '../../Sections/PageContent';
import EditProfileForm from './EditProfileForm';

const EditProfile: React.FC = (): ReactElement => {
  return (
    <PageContent
      loadingText="Profiel"
      content={
        <>
          <PageHeaderWithoutButton title="Profiel" />
          <EditProfileForm />
        </>
      }
    />
  );
};

export default EditProfile;
