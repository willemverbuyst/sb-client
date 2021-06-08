import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import MessageComponent from '../../../Components/Communication/Message';
import PageHeaderWithoutButton from '../../../Components/Header/PageHeaderWithoutBtn';
import { selectUser } from '../../../store/user/selectors';
import PageContent from '../../Sections/PageContent';
import EditProfileForm from './EditProfileForm';

const EditProfile: React.FC = (): ReactElement => {
  const user = useSelector(selectUser);

  return (
    <PageContent
      loadingText="Profiel"
      content={
        <>
          <PageHeaderWithoutButton title="Profiel" />
          {user ? <EditProfileForm user={user} /> : <MessageComponent message={`Geen profiel gevonden`} />}
        </>
      }
    />
  );
};

export default EditProfile;
