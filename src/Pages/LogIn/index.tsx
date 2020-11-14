import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { LogInCredentials } from '../../models/credentials.model';
import { userLogIn } from '../../store/user/actions';
import { ButtonEvent } from '../../models/events.model';
import { selectToken } from '../../store/user/selectors'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
}));

export default function LogIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [logInCredentials, setLogInCredentials] = useState<LogInCredentials>({
    email: '',
    password: '',
  });
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (token) {
      history.push("/home");
    }
  });

  const submitForm = (e: ButtonEvent): void => {
    e.preventDefault();
    dispatch(userLogIn(logInCredentials))
    setLogInCredentials({
      email: '',
      password: '',
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
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
            color="primary"
            className={classes.submit}
            onClick={submitForm}
          >
            Log In
          </Button>
        </form>
      </div>
    </Container>
  );
}

