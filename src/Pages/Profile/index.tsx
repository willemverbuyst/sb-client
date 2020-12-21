import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { 
  Box, 
  Button, 
  Grid, 
  Typography 
} from '@material-ui/core';
import { selectAppLoading } from '../../store/appState/selectors';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import ChangePasswordForm from '../../Components/Form/ChangePasswordForm';
import EditProfileForm from '../../Components/Form/EditProfileForm';


const useStyles = makeStyles((theme: Theme) => ({
    title: {
      fontWeight: 'bold',
      marginBottom: theme.spacing(1),
      color: theme.palette.secondary.main
    },
    passwordBtn: {
      marginLeft: theme.spacing(1),
    },
    progress: {
      minHeight: '70vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
 }));

export default function Profile() {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const history = useHistory();
  const isLoading = useSelector(selectAppLoading);
  const [editProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    if (!token) history.push("/login");
  });

  const handleEditProfile = () => {
    setChangePassword(false);
    setEditProfile(!editProfile)
  }

  const handleChangePassword = () => {
    setEditProfile(false);
    setChangePassword(!changePassword)
  }

  return (
    <Grid container>
      <Grid container justify="space-between">
        <Grid>
          <Typography variant="h3" className={classes.title}>
            Mijn profiel
          </Typography>
        </Grid>
        <Grid>
          <Button
            variant="contained" 
            size="small" 
            color="secondary" 
            disableElevation 
            onClick={handleEditProfile}
          >
            {!editProfile ? 'EDIT PROFIEL' : 'SLUIT EDIT PROFIEL'}
          </Button>
          <Button
            variant="contained"
            size="small" 
            color="secondary"
            disableElevation 
            onClick={handleChangePassword}
            className={classes.passwordBtn}
          >
            {!changePassword? 'CHANGE PASSWORD' : 'SLUIT CHANGE PASSWORD'}
          </Button>  
        </Grid>
      </Grid>

      { isLoading ?
          <Box className={classes.progress}>
            <ProgressLinear/> 
          </Box>
        : editProfile ? 
          <EditProfileForm handleSubmit={() => setEditProfile(false)}/>
        : changePassword ? 
          <ChangePasswordForm handleSubmit={() => setChangePassword(false)}/>
        : null }
    </Grid>
  )
}
