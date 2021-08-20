import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { ReactElement } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SubmitForm from '../../Components/Button/SubmitForm';
import { ITeamForSelector } from '../../models/toto.models';
import { addPlayer } from '../../store/players/action-creators';
import { useStyles } from './styles';

interface IProps {
  teams: ITeamForSelector[];
}

type Inputs = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  totaalToto: boolean;
  teamId: string;
};

const SignUpForm: React.FC<IProps> = ({ teams }: IProps): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const submitForm: SubmitHandler<Inputs> = (data) => {
    dispatch(
      addPlayer({
        userName: data.userName,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        totaalToto: data.totaalToto,
        teamId: Number(data.teamId),
      }),
    );
    reset(data, {
      keepValues: false,
    });
    history.push('/spelers');
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6} lg={4} className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
          <Grid container>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="User Name"
              {...register('userName', { required: 'This field is required' })}
            />
            {errors.userName && (
              <Typography color="error">{errors.userName.message}</Typography>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="First Name"
              {...register('firstName', { required: 'This field is required' })}
            />
            {errors.firstName && (
              <Typography color="error">{errors.firstName.message}</Typography>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Last Name"
              {...register('lastName', { required: 'This field is required' })}
            />
            {errors.lastName && (
              <Typography color="error">{errors.lastName.message}</Typography>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email Address"
              {...register('email', { required: 'This field is required' })}
            />
            {errors.email && (
              <Typography color="error">{errors.email.message}</Typography>
            )}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Controller
                    name="totaalToto"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <Checkbox color="primary" {...field} />
                    )}
                  />
                }
                label="Totaal toto"
              />
            </Grid>
            <TextField
              variant="outlined"
              type="password"
              margin="normal"
              fullWidth
              label="Password"
              {...register('password', { required: 'This field is required' })}
            />
            {errors.password && (
              <Typography color="error">{errors.password.message}</Typography>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Phone Number"
              {...register('phoneNumber', {
                required: 'This field is required',
              })}
            />
            {errors.phoneNumber && (
              <Typography color="error">
                {errors.phoneNumber.message}
              </Typography>
            )}
            <FormControl variant="outlined" fullWidth>
              <Controller
                name="teamId"
                control={control}
                defaultValue=""
                rules={{
                  required: 'This field is required',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    margin="normal"
                    select
                    label="Team"
                  >
                    {[...teams]
                      .sort((optionOne, optionTwo) =>
                        optionOne.name.localeCompare(optionTwo.name),
                      )
                      .map((team, i) => (
                        <MenuItem key={i} value={team.id}>
                          {team.name}
                        </MenuItem>
                      ))}
                  </TextField>
                )}
              />
            </FormControl>
            {errors.teamId && (
              <Typography color="error">{errors.teamId.message}</Typography>
            )}
          </Grid>
          <SubmitForm caption="SIGN UP" color="primary" />
        </form>
      </Grid>
    </Grid>
  );
};

export default SignUpForm;
