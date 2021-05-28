import { Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TextFieldComponent from '../../Components/Form/TextFieldComponent';
import { IProfileDetails } from '../../models/credentials.model';
import { ButtonEvent } from '../../models/events.model';
import { fetchAllTeams } from '../../store/teams/actions';
import { selectTeams } from '../../store/teams/selectors';
import { selectUser } from '../../store/user/selectors';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
    },
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  select: {
    marginTop: theme.spacing(2),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

type Props = {
  handleSubmit: () => void;
};

const EditProfileForm: React.FC<Props> = (props: Props): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const teams = useSelector(selectTeams);
  const [profileDetails, setProfileDetails] = useState<IProfileDetails>({
    userName: user?.userName || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    admin: user?.admin || false,
    totaalToto: user?.totaalToto || true,
    teamId: user?.team.id || '',
  });

  useEffect(() => {
    if (!teams) {
      dispatch(fetchAllTeams());
    }
  }, [dispatch, teams]);

  const submitForm = (e: ButtonEvent): void => {
    e.preventDefault();
    setProfileDetails({
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      admin: false,
      totaalToto: true,
      teamId: '',
    });

    props.handleSubmit();
  };

  const updateUserName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setProfileDetails({
      ...profileDetails,
      userName: e.target.value,
    });

  const updateFirstName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setProfileDetails({
      ...profileDetails,
      firstName: e.target.value,
    });

  const updateLastName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setProfileDetails({
      ...profileDetails,
      lastName: e.target.value,
    });

  const updateEmailAddress = (e: React.ChangeEvent<HTMLInputElement>) =>
    setProfileDetails({
      ...profileDetails,
      email: e.target.value,
    });

  const updatePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) =>
    setProfileDetails({
      ...profileDetails,
      phoneNumber: e.target.value,
    });

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={6} lg={4} className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={1}>
            <TextFieldComponent
              id="userName"
              label="User Name"
              value={profileDetails.userName}
              onChange={updateUserName}
            />
            <TextFieldComponent
              id="firstName"
              label="First Name"
              value={profileDetails.firstName}
              onChange={updateFirstName}
            />
            <TextFieldComponent
              id="lastName"
              label="Last Name"
              value={profileDetails.lastName}
              onChange={updateLastName}
            />
            <TextFieldComponent
              id="email"
              label="Email Address"
              value={profileDetails.email}
              onChange={updateEmailAddress}
            />
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={profileDetails.admin}
                    color="primary"
                    onChange={(e) =>
                      setProfileDetails({
                        ...profileDetails,
                        admin: e.target.checked,
                      })
                    }
                  />
                }
                label="Admin"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={profileDetails.totaalToto}
                    color="primary"
                    onChange={(e) =>
                      setProfileDetails({
                        ...profileDetails,
                        totaalToto: e.target.checked,
                      })
                    }
                  />
                }
                label="Totaal Toto"
              />
            </Grid>
          </Grid>
          <TextFieldComponent
            id="phoneNumber"
            label="Phone Number"
            value={profileDetails.phoneNumber}
            onChange={updatePhoneNumber}
          />

          {teams ? (
            <Grid item xs={12} className={classes.select}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="favTeam">Team</InputLabel>
                <Select
                  labelId="favTeam"
                  id="teeamId"
                  value={profileDetails.teamId}
                  onChange={(e) =>
                    setProfileDetails({
                      ...profileDetails,
                      teamId: e.target.value as number,
                    })
                  }
                  label="Team"
                >
                  {[...teams]
                    .sort((teamA, teamB) => teamA.name.localeCompare(teamB.name))
                    .map((team, i) => (
                      <MenuItem key={i} value={team.id}>
                        {team.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          ) : null}

          <Button
            type="submit"
            fullWidth
            disableElevation
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitForm}
          >
            UPDATE PROFIEL
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default EditProfileForm;
