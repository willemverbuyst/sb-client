import React, { useState, useEffect, ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppLoading } from '../../store/appState/selectors';
import { userLogIn } from '../../store/user/actions';
import { selectToken } from '../../store/user/selectors';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Button, Grid, TextField, Theme } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { ILogInCredentials } from '../../models/credentials.model';
import { ButtonEvent } from '../../models/events.model';
import ProgressLinear from '../../Components/Progress/ProgressLinear';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
    color: theme.palette.secondary.main,
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    [theme.breakpoints.down('sm')]: {
      minHeight: '60vh',
    },
    backgroundColor: '#f1f1f1',
    minHeight: 'calc(100vh - 8.6rem)',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const LogIn: React.FC = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [logInCredentials, setLogInCredentials] = useState<ILogInCredentials>({
    email: '',
    password: '',
  });
  const token = useSelector(selectToken);
  const history = useHistory();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    if (token) history.push('/programma');
  }, [token, history]);

  const submitForm = (e: ButtonEvent): void => {
    e.preventDefault();
    dispatch(userLogIn(logInCredentials));
    setLogInCredentials({
      email: '',
      password: '',
    });
  };

  return (
    <Box>
      {isLoading ? (
        <Box className={classes.progress}>
          <ProgressLinear />
        </Box>
      ) : (
        <Grid container justify="center">
          <Grid item xs={12} sm={8} md={6} lg={4} className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={logInCredentials.email}
                onChange={(e) =>
                  setLogInCredentials({
                    ...logInCredentials,
                    email: e.target.value,
                  })
                }
              />
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
                value={logInCredentials.password}
                onChange={(e) =>
                  setLogInCredentials({
                    ...logInCredentials,
                    password: e.target.value,
                  })
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disableElevation
                color="primary"
                className={classes.submit}
                onClick={submitForm}
              >
                Log In
              </Button>
            </form>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default LogIn;
