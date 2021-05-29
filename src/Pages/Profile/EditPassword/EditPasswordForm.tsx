import { Button, Grid, TextField } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ButtonEvent } from '../../../models/events.model';
import { changePassword } from '../../../store/user/actions';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
    },
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const EditPasswordForm: React.FC = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const submitForm = (e: ButtonEvent): void => {
    e.preventDefault();

    if (password1 === password2) {
      dispatch(changePassword(password1));
    } else {
      setShowAlert(true);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    setPassword1('');
    setPassword2('');
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6} lg={4} className={classes.paper}>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password1"
            label="Password"
            name="password1"
            type="password"
            autoComplete="email"
            autoFocus
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Confirm password"
            type="password"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disableElevation
            color="primary"
            className={classes.margin}
            onClick={submitForm}
          >
            CHANGE PASSWORD
          </Button>
          {showAlert ? (
            <Alert onClose={closeAlert} severity="error" variant="outlined" className={classes.margin}>
              Passwords are not the same
            </Alert>
          ) : null}
        </form>
      </Grid>
    </Grid>
  );
};

export default EditPasswordForm;
