import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import MessageComponent from '../../../Components/Communication/Message';
import PageTitle from '../../../Components/Title/PageTitle';
import PageContent from '../../../Sections/PageContent';
import { selectUser } from '../../../store/user/selectors';
import EditProfileForm from './EditProfileForm';

const EditProfile: React.FC = (): ReactElement => {
  const user = useSelector(selectUser);

  return (
    <PageContent
      loadingText="Profiel"
      content={
        <>
          <PageTitle title="Profiel" color="primary" />
          {user ? (
            <EditProfileForm user={user} />
          ) : (
            <MessageComponent message={`Geen profiel gevonden`} />
          )}
        </>
      }
    />
  );
};

export default EditProfile;
