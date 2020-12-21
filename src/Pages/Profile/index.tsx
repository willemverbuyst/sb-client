import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectToken, selectUser } from '../../store/user/selectors'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { 
  Box, 
  Button, 
  Checkbox, 
  Container, 
  FormControl, 
  FormControlLabel, 
  Grid, 
  InputLabel, 
  MenuItem, 
  Select, 
  TextField, 
  Typography 
} from '@material-ui/core';
import { IProfileDetails } from '../../models/credentials.model';
import { selectAppLoading } from '../../store/appState/selectors';
import { selectTeams } from '../../store/teams/selectors';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import { fetchAllTeams } from '../../store/teams/actions';
import { ButtonEvent } from '../../models/events.model';
import ChangePasswordForm from '../../Components/Form/ChangePasswordForm';

const useStyles = makeStyles((theme: Theme) => ({
    title: {
      fontWeight: 'bold',
      marginBottom: theme.spacing(1),
      color: theme.palette.secondary.main
    },
    paper: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    select: {
      marginTop: theme.spacing(2)
    },
    passwordBtn: {
      marginLeft: theme.spacing(1),
    },
    submit: {
      marginTop: theme.spacing(3),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
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
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const teams = useSelector(selectTeams);
  const isLoading = useSelector(selectAppLoading);
  const [editProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [profileDetails, setProfileDetails] = useState<IProfileDetails>({
    userName: user?.userName || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    admin: user?.admin || false,
    totaalToto: user?.totaalToto || true,
    teamId: '',
  });

  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    if (!teams) {
      dispatch(fetchAllTeams)
    }
  },[dispatch, teams]);

  const submitForm = (e: ButtonEvent): void => {
    e.preventDefault();

    // UPDATE USER
    
    setProfileDetails({
      userName:'',
      firstName:'',
      lastName:'',
      email:'',
      phoneNumber:'',
      admin: false,
      totaalToto: true,
      teamId:'',
    })

    setEditProfile(false)
  };

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

      { editProfile && isLoading ?
          <Box className={classes.progress}>
            <ProgressLinear/> 
          </Box>
        : editProfile && teams ? 
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <form className={classes.form} noValidate>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="userName"
                      label="User Name"
                      name="userName"
                      autoFocus
                      value={profileDetails.userName}
                      onChange={(e) =>
                        setProfileDetails({
                          ...profileDetails,
                          userName: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      value={profileDetails.firstName}
                      onChange={(e) =>
                        setProfileDetails({
                          ...profileDetails,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      value={profileDetails.lastName}
                      onChange={(e) =>
                        setProfileDetails({
                          ...profileDetails,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={profileDetails.email}
                      onChange={(e) =>
                        setProfileDetails({
                          ...profileDetails,
                          email: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={<Checkbox checked={profileDetails.admin} color="primary" onChange={(e) =>
                        setProfileDetails({
                          ...profileDetails,
                          admin: e.target.checked,
                        })
                      }/>}
                      label="Admin"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={<Checkbox checked={profileDetails.totaalToto} color="primary" onChange={(e) =>
                        setProfileDetails({
                          ...profileDetails,
                          totaalToto: e.target.checked,
                        })
                      } />}
                      label="Totaal Toto"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="phoneNumber"
                      label="phomeNumber"
                      type="text"
                      id="phoneNumber"
                      value={profileDetails.phoneNumber}
                      onChange={(e) =>
                        setProfileDetails({
                          ...profileDetails,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  </Grid>
                <Grid item xs={12} className={classes.select}>
               
                  <FormControl 
                    variant="outlined"
                    fullWidth
                  >
                    <InputLabel id="favTeam">Team</InputLabel>
                    <Select
                      labelId="favTeam"
                      id="teeamId"
                      value={profileDetails.teamId}
                      onChange={(e) =>
                        setProfileDetails({
                          ...profileDetails,
                          teamId: e.target.value as number,
                        })}
                      label="Team"
                    >
                      {[...teams].sort((teamA, teamB) => teamA.name.localeCompare(teamB.name))
                        .map((team, i) => <MenuItem key={i} value={team.id}>{team.name}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  disableElevation 
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={submitForm}
                >
                  UPDATE PROFIEL
                </Button>  

              </form>
            </div>
          </Container>
        : changePassword ? 
          <ChangePasswordForm/>
        : null }
    </Grid>
  )
}
