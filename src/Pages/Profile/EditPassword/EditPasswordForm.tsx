import { Grid, Link, TextField, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import SubmitForm from '../../../Components/Button/SubmitForm';
import * as HISTORY from '../../../history';
import { changePassword } from '../../../store/user/action-creators';
import { useStyles } from './styles';

type Inputs = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const EditPasswordForm: React.FC = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Inputs>();
  const newPassword = watch('newPassword', '');

  const submitForm: SubmitHandler<Inputs> = (data) => {
    dispatch(
      changePassword(
        data.currentPassword,
        data.newPassword,
        data.confirmPassword,
      ),
    );
    reset(data, {
      keepValues: false,
    });
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6} lg={4} className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
          <Grid container>
            <TextField
              variant="outlined"
              type="password"
              margin="normal"
              fullWidth
              label="Current Password"
              {...register('currentPassword', {
                required: 'This field is required',
              })}
            />
            {errors.currentPassword && (
              <Typography color="error">
                {errors.currentPassword.message}
              </Typography>
            )}
            <TextField
              variant="outlined"
              type="password"
              margin="normal"
              fullWidth
              label="New Password"
              {...register('newPassword', {
                required: 'This field is required',
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters',
                },
              })}
            />
            {errors.newPassword && (
              <Typography color="error">
                {errors.newPassword.message}
              </Typography>
            )}
            <TextField
              variant="outlined"
              type="password"
              margin="normal"
              fullWidth
              label="Confirm New Password"
              {...register('confirmPassword', {
                required: 'This field is required',
                validate: (value) =>
                  value === newPassword || 'The passwords do not match',
              })}
            />
            {errors.confirmPassword && (
              <Typography color="error">
                {errors.confirmPassword.message}
              </Typography>
            )}
          </Grid>
          <SubmitForm caption="CHANGE PASSWORD" color="primary" />
          <Link href="#" onClick={HISTORY.gotoProfile}>
            Edit Profile
          </Link>
        </form>
      </Grid>
    </Grid>
  );
};

export default EditPasswordForm;
