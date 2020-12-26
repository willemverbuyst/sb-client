import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { selectAppLoading } from '../../store/appState/selectors';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import ChangePasswordForm from '../../Components/Form/ChangePasswordForm';
import EditProfileForm from '../../Components/Form/EditProfileForm';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.main,
  },
  passwordBtn: {
    marginLeft: theme.spacing(1),
  },
  divider: {
    marginBottom: theme.spacing(6),
  },
  totoRound: {
    marginBottom: theme.spacing(6),
  },
  progress: {
    minHeight: '70vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function Profile() {
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
      <Grid container justify="space-between">
        <Grid>
          <Typography variant="h3" className={classes.title}>
            Profiel
          </Typography>
        </Grid>
        <Grid>
          <Button variant="contained" size="small" color="secondary" disableElevation onClick={handleEditProfile}>
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
}
