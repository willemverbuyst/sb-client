import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import SubmitButtonComponent from '../../../Components/Button/SubmitButton';
import PasswordFieldComponent from '../../../Components/Form/PasswordField';
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

  const updatePassword1 = (event: React.ChangeEvent<HTMLInputElement>) => setPassword1(event.target.value);
  const updatePassword2 = (event: React.ChangeEvent<HTMLInputElement>) => setPassword2(event.target.value);

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6} lg={4} className={classes.paper}>
        <form className={classes.form} noValidate>
          <PasswordFieldComponent id="password1" label="Password" value={password1} onChange={updatePassword1} />
          <PasswordFieldComponent id="password2" label="Password" value={password2} onChange={updatePassword2} />
          <SubmitButtonComponent caption="CHANGE PASSWORD" color="primary" handleClick={submitForm} />
          <Link to="/profiel/edit">Edit Profile</Link>

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
