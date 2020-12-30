import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { selectAppLoading } from '../../store/appState/selectors';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import ChangePasswordForm from '../../Components/Form/ChangePasswordForm';
import EditProfileForm from '../../Components/Form/EditProfileForm';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { progress, title, topSection } from '../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...progress(),
  ...topSection(theme),
  ...title(theme),
}));

const Profile: React.FC = (): ReactElement => {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const history = useHistory();
  const isLoading = useSelector(selectAppLoading);
  const [editProfile, setEditProfile] = useState(true);
  const theme = useTheme();
  const btnVariant = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    if (!token) history.push('/login');
  });

  const handleEditProfile = () => {
    setEditProfile(!editProfile);
  };

  return (
    <Box>
      <Grid container className={classes.topSection}>
        <Grid>
          <Typography variant="h3" className={classes.title}>
            Profiel
          </Typography>
        </Grid>
        <Grid>
          <Button
            variant={btnVariant ? 'contained' : 'outlined'}
            size="small"
            color="secondary"
            disableElevation
            onClick={handleEditProfile}
          >
            {!editProfile ? 'EDIT PROFIEL' : 'CHANGE PASSWORD'}
          </Button>
        </Grid>
      </Grid>

      {isLoading ? (
        <Box className={classes.progress}>
          <ProgressLinear />
        </Box>
      ) : editProfile ? (
        <EditProfileForm handleSubmit={() => setEditProfile(true)} />
      ) : (
        <ChangePasswordForm handleSubmit={() => setEditProfile(true)} />
      )}
    </Box>
  );
};

export default Profile;
