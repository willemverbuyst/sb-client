import { Box, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ButtonComponent from '../../Components/Button';
import ChangePasswordForm from '../../Components/Form/ChangePasswordForm';
import EditProfileForm from '../../Components/Form/EditProfileForm';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import PageTitle from '../../Components/Title/PageTitle';
import { selectAppLoading } from '../../store/appState/selectors';
import { selectToken } from '../../store/user/selectors';
import { topSection } from '../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...topSection(theme),
}));

const Profile: React.FC = (): ReactElement => {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const history = useHistory();
  const isLoading = useSelector(selectAppLoading);
  const [editProfile, setEditProfile] = useState(true);

  useEffect(() => {
    if (!token) history.push('/login');
  });

  const handleEditProfile = () => {
    setEditProfile(!editProfile);
  };

  return (
    <Box>
      <Grid container className={classes.topSection}>
        <PageTitle text="Profiel" />
        <Grid>
          <ButtonComponent
            caption={!editProfile ? 'EDIT PROFIEL' : 'CHANGE PASSWORD'}
            color="secondary"
            handleClick={handleEditProfile}
          />
        </Grid>
      </Grid>

      {isLoading ? (
        <ProgressLinear />
      ) : editProfile ? (
        <EditProfileForm handleSubmit={() => setEditProfile(true)} />
      ) : (
        <ChangePasswordForm handleSubmit={() => setEditProfile(true)} />
      )}
    </Box>
  );
};

export default Profile;
