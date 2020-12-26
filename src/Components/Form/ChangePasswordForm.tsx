import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Container, TextField } from '@material-ui/core';
import { ButtonEvent } from '../../models/events.model';
import { changePassword } from '../../store/user/actions';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type Props = {
  handleSubmit: () => void;
};

const ChangePasswordForm: React.FC<Props> = (prop: Props): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const submitForm = (e: ButtonEvent): void => {
    e.preventDefault();

    if (password1 === password2) {
      dispatch(changePassword(password1));
      prop.handleSubmit();
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
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
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
      </div>
    </Container>
  );
};

export default ChangePasswordForm;
