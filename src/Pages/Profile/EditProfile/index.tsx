import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import PageHeaderWithoutButton from '../../../Components/Header/PageHeaderWithoutBtn';
import { selectToken } from '../../../store/user/selectors';
import PageContent from '../../Sections/PageContent';
import EditProfileForm from './EditProfileForm';

const EditProfile: React.FC = (): ReactElement => {
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (!token) history.push('/login');
  });

  return (
    <PageContent
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
