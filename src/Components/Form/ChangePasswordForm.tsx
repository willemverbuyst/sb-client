import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Avatar, 
  Button, 
  Container, 
  TextField 
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { ButtonEvent } from '../../models/events.model';

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

export default function ChangePasswordForm() {
  const classes = useStyles();
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');

  const submitForm = (e: ButtonEvent): void => {
    e.preventDefault();

    console.log(password1);
    console.log(password2);
  };

  return (
    <Container component="main" maxWidth="xs">
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
          id="password1"
          label="Wachtwoord"
          name="password1"
          type="password"
          autoComplete="email"
          autoFocus
          value={password1}
          onChange={(e) =>
            setPassword1(e.target.value)
          }
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password2"
          label="Bevestig wachtwoord"
          type="password"
          id="password2"
          value={password2}
          onChange={(e) =>
            setPassword2(e.target.value)
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
          CHANGE PASSWORD
        </Button>
      </form>
    </div>
  </Container> 
  )
}
