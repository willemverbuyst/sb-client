import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import SubmitButtonComponent from '../../Components/Button/SubmitButton';
import CheckBoxComponent from '../../Components/Form/CheckBoxComponent';
import SelectorComponent from '../../Components/Form/Selector';
import TextFieldComponent from '../../Components/Form/TextFieldComponent';
import { IProfileDetails } from '../../models/credentials.model';
import { ButtonEvent } from '../../models/events.model';
import { fetchAllTeams } from '../../store/teams/actions';
import { selectTeams } from '../../store/teams/selectors';
import { editUserProfile } from '../../store/user/actions';
import { selectUser } from '../../store/user/selectors';
import * as HELPERS from './helpers';

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
}));

type IProps = {
  handleSubmit: () => void;
};

const EditProfileForm: React.FC<IProps> = ({ handleSubmit }: IProps): ReactElement => {
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
  const teamsForSelector = teams ? HELPERS.getTeamsForSelector(teams) : null;

  useEffect(() => {
    if (!teams) {
      dispatch(fetchAllTeams());
    }
  }, [dispatch, teams]);

  const submitForm = (e: ButtonEvent): void => {
    e.preventDefault();
    console.log(profileDetails);
    dispatch(editUserProfile(profileDetails));
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
    handleSubmit();
  };

  const updateProfileDetails = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue =
      event.target.id === 'admin' || event.target.id === 'totaalToto' ? !!event.target.value : event.target.value;

    setProfileDetails({
      ...profileDetails,
      [event.target.id]: newValue,
    });
  };

  const updateFavoriteTeam = (event: ChangeEvent<{ name?: string | undefined; value: unknown }>): void => {
    if (typeof event.target.value === 'number' || event.target.value === '') {
      setProfileDetails({
        ...profileDetails,
        teamId: event.target.value,
      });
    }
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={6} lg={4} className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={1}>
            <TextFieldComponent
              id="userName"
              label="User Name"
              value={profileDetails.userName}
              onChange={updateProfileDetails}
            />
            <TextFieldComponent
              id="firstName"
              label="First Name"
              value={profileDetails.firstName}
              onChange={updateProfileDetails}
            />
            <TextFieldComponent
              id="lastName"
              label="Last Name"
              value={profileDetails.lastName}
              onChange={updateProfileDetails}
            />
            <TextFieldComponent
              id="email"
              label="Email Address"
              value={profileDetails.email}
              onChange={updateProfileDetails}
            />
            <CheckBoxComponent checked={profileDetails.admin} onChange={updateProfileDetails} label="Admin" />
            <CheckBoxComponent
              checked={profileDetails.totaalToto}
              onChange={updateProfileDetails}
              label="Totaal Toto"
            />
          </Grid>
          <TextFieldComponent
            id="phoneNumber"
            label="Phone Number"
            value={profileDetails.phoneNumber}
            onChange={updateProfileDetails}
          />

          {teamsForSelector ? (
            <SelectorComponent
              label="Team"
              labelId="favTeam"
              id="teamId"
              value={profileDetails.teamId}
              onChange={updateFavoriteTeam}
              options={teamsForSelector}
            />
          ) : null}

          <SubmitButtonComponent caption="UPDATE PROFIEL" color="primary" handleClick={submitForm} />
          <Link to="/profiel/password">Change Password</Link>
        </form>
      </Grid>
    </Grid>
  );
};

export default EditProfileForm;
