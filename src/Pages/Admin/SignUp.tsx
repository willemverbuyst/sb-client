import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTeams } from '../../store/teams/actions';
import { selectTeams } from '../../store/teams/selectors'; 
import { selectToken } from '../../store/user/selectors';
import { selectUser } from '../../store/user/selectors';
import { makeStyles } from '@material-ui/core/styles';
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
import { SignUpCredentials } from '../../models/credentials.model';
import { ButtonEvent } from '../../models/events.model';

const useStyles = makeStyles((theme) => ({
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const teams = useSelector(selectTeams);
  const history = useHistory();
  const dispatch = useDispatch();
  const [signUpCredentials, setSignUpCredentials] = useState<SignUpCredentials>({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    admin: false,
    totaalToto: true,
    teamId: '',
  });
 
  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    if (user && !user.admin) history.push("/page-not-found");
  })

  useEffect(() => {
    dispatch(fetchAllTeams())
  });

  const submitForm = (e: ButtonEvent): void => {
    e.preventDefault();
    console.log(e)
  };

  return (
    token ? (  
      <Box>
        <Typography variant="h2" className={classes.title}>
          Sign Up
        </Typography>
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
                    value={signUpCredentials.userName}
                    onChange={(e) =>
                      setSignUpCredentials({
                        ...signUpCredentials,
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
                    value={signUpCredentials.firstName}
                    onChange={(e) =>
                      setSignUpCredentials({
                        ...signUpCredentials,
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
                    value={signUpCredentials.lastName}
                    onChange={(e) =>
                      setSignUpCredentials({
                        ...signUpCredentials,
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
                    value={signUpCredentials.email}
                    onChange={(e) =>
                      setSignUpCredentials({
                        ...signUpCredentials,
                        email: e.target.value,
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
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={signUpCredentials.password}
                    onChange={(e) =>
                      setSignUpCredentials({
                        ...signUpCredentials,
                        password: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={<Checkbox checked={signUpCredentials.admin} color="primary" onChange={(e) =>
                      setSignUpCredentials({
                        ...signUpCredentials,
                        admin: e.target.checked,
                      })
                    }/>}
                    label="Admin"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={<Checkbox checked={signUpCredentials.totaalToto} color="primary" onChange={(e) =>
                      setSignUpCredentials({
                        ...signUpCredentials,
                        totaalToto: e.target.checked,
                      })
                    } />}
                    label="Totaal Toto"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.select}>
                { teams ? (
                <FormControl 
                  variant="outlined"
                  fullWidth
                >
                  <InputLabel id="favTeam">Team</InputLabel>
                  <Select
                    labelId="favTeam"
                    id="teeamId"
                    value={signUpCredentials.teamId}
                    onChange={(e) =>
                      setSignUpCredentials({
                        ...signUpCredentials,
                        teamId: e.target.value as number,
                      })}
                    label="Team"
                  >
                    {[...teams].sort((teamA, teamB) => teamA.name.localeCompare(teamB.name))
                      .map((team, i) => <MenuItem key={i} value={team.id}>{team.name}</MenuItem>)}
                  </Select>
                </FormControl> 
                ) : ('')}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={submitForm}
              >
                Log In
              </Button>        
            </form>
          </div>
        </Container>
      </Box>
    ) : ( null )
  )
}
