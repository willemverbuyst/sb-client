import {
  FormControl,
  Grid,
  Link,
  MenuItem,
  TextField,
} from '@material-ui/core';
import React, { ReactElement } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import SubmitForm from '../../../Components/Button/SubmitForm';
import ControllerCheckbox from '../../../Components/Form/ControllerCheckbox';
import ControllerTextInput from '../../../Components/Form/ControllerTextInput';
import * as HISTORY from '../../../history';
import { IUser } from '../../../models/player.model';
import { ITeamForSelector } from '../../../models/toto.models';
import { editUserProfile } from '../../../store/user/action-creators';
import { useStyles } from './styles';

interface IProps {
  teams: ITeamForSelector[];
  user: IUser;
}

type Inputs = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  totaalToto: boolean;
  teamId: string;
};

const EditProfileForm: React.FC<IProps> = ({
  teams,
  user,
}: IProps): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const submitForm: SubmitHandler<Inputs> = (data) => {
    // dispatch(
    //   editUserProfile({
    //     userName: data.userName,
    //     firstName: data.firstName,
    //     lastName: data.lastName,
    //     email: data.email,
    //     phoneNumber: data.phoneNumber,
    //     totaalToto: data.totaalToto,
    //     teamId: Number(data.teamId),
    //   }),
    // );
    console.log(data);
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6} lg={4} className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
          <Grid container>
            <ControllerTextInput
              control={control}
              defaultValue={user.userName}
              error={errors.userName}
              label="User Name"
              name="userName"
            />
            <ControllerTextInput
              control={control}
              defaultValue={user.firstName}
              error={errors.firstName}
              label="First Name"
              name="firstName"
            />
            <ControllerTextInput
              control={control}
              defaultValue={user.lastName}
              error={errors.lastName}
              label="Last Name"
              name="lastName"
            />
            <ControllerTextInput
              control={control}
              defaultValue={user.email}
              error={errors.email}
              label="Email Address"
              name="email"
            />
            <ControllerCheckbox
              control={control}
              defaultValue={user.totaalToto}
              label="Totaaltoto"
              name="totaalToto"
            />
            <ControllerTextInput
              control={control}
              defaultValue={user.phoneNumber}
              error={errors.phoneNumber}
              label="Phone Number"
              name="phoneNumber"
            />
            <Controller
              control={control}
              render={({ field }) => (
                <FormControl variant="outlined" fullWidth>
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
                </FormControl>
              )}
              name="teamId"
              defaultValue={String(user.team.id)}
            />
          </Grid>
          <SubmitForm caption="UPDATE PROFIEL" color="primary" />
          <Link href="#" onClick={HISTORY.gotoEditPassword}>
            Change Password
          </Link>
        </form>
      </Grid>
    </Grid>
  );
};

export default EditProfileForm;
