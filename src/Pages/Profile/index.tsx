import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ChangePasswordForm from '../../Components/Form/ChangePasswordForm';
import PageHeaderWithButton from '../../Components/PageHeader/PageHeaderWithBtn';
import ProgressComponent from '../../Components/Progress';
import { selectAppLoading } from '../../store/appState/selectors';
import { selectToken } from '../../store/user/selectors';
import EditProfileForm from './EditProfileForm';

const Profile: React.FC = (): ReactElement => {
  const token = useSelector(selectToken);
  const history = useHistory();
  const isLoading = useSelector(selectAppLoading);
  const [editProfile, setEditProfile] = useState(true);

  useEffect(() => {
    if (!token) history.push('/login');
  });

  const handleEditProfile = (): void => {
    setEditProfile(!editProfile);
  };
  const changeProfile = (): void => setEditProfile(true);
  const changePassword = (): void => setEditProfile(true);
  const caption: string = !editProfile ? 'EDIT PROFIEL' : 'CHANGE PASSWORD';

  return (
    <Box>
      <PageHeaderWithButton title="Profiel" captionBtn={caption} colorBtn="secondary" handleClick={handleEditProfile} />

      {isLoading ? (
        <ProgressComponent />
      ) : editProfile ? (
        <EditProfileForm handleSubmit={changeProfile} />
      ) : (
        <ChangePasswordForm handleSubmit={changePassword} />
      )}
    </Box>
  );
};

export default Profile;
