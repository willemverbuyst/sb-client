import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SubmitButtonComponent from '../../Components/Button/SubmitButton';
import CheckBoxComponent from '../../Components/Form/CheckBoxComponent';
import SelectorComponent from '../../Components/Form/Selector';
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

          {teams ? (
            <SelectorComponent
              label="Team"
              labelId="favTeam"
              id="teamId"
              value={profileDetails.teamId}
              onChange={updateFavoriteTeam}
              options={teams}
            />
          ) : // <Grid item xs={12} className={classes.select}>
          //   <FormControl variant="outlined" fullWidth>
          //     <InputLabel id="favTeam">Team</InputLabel>
          //     <Select
          //       labelId="favTeam"
          //       id="teeamId"
          //       value={profileDetails.teamId}
          //       onChange={(e) =>
          //         setProfileDetails({
          //           ...profileDetails,
          //           teamId: e.target.value as number,
          //         })
          //       }
          //       label="Team"
          //     >
          //       {[...teams]
          //         .sort((teamA, teamB) => teamA.name.localeCompare(teamB.name))
          //         .map((team, i) => (
          //           <MenuItem key={i} value={team.id}>
          //             {team.name}
          //           </MenuItem>
          //         ))}
          //     </Select>
          //   </FormControl>
          // </Grid>
          null}

          <SubmitButtonComponent caption="UPDATE PROFIEL" color="primary" handleClick={submitForm} />
        </form>
      </Grid>
    </Grid>
  );
};

export default EditProfileForm;
