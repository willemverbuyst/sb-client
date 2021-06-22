import React, { ReactElement, useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import SubmitButtonComponent from '../../../Components/Button/SubmitButton';
import CheckBoxComponent from '../../../Components/Form/CheckBox';
import FormContainer from '../../../Components/Form/FormContainer';
import SelectorComponent from '../../../Components/Form/Selector';
import TextFieldComponent from '../../../Components/Form/TextField';
import { IProfileDetails } from '../../../models/credentials.model';
import { IUser } from '../../../models/player.model';
import { fetchAllTeams } from '../../../store/teams/action-creators';
import { selectTeams } from '../../../store/teams/selectors';
import { editUserProfile } from '../../../store/user/action-creators';
import * as UTILS from '../../../utils';

interface IProps {
  user: IUser;
}

const EditProfileForm: React.FC<IProps> = ({ user }: IProps): ReactElement => {
  const dispatch = useDispatch();
  const teams = useSelector(selectTeams);
  const [profileDetails, setProfileDetails] = useState<IProfileDetails>({
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    admin: user.admin,
    totaalToto: user.totaalToto,
    teamId: user.team.id,
  });
  const teamsForSelector = teams ? UTILS.getTeamsForSelector(teams) : null;

  useEffect(() => {
    if (!teams) {
      dispatch(fetchAllTeams());
    }
  }, [dispatch, teams]);

  const submitForm = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    dispatch(editUserProfile(profileDetails));
  };

  const updateProfileDetails = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue =
      event.target.id === 'admin' || event.target.id === 'totaalToto' ? event.target.checked : event.target.value;

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
    <FormContainer
      inputFields={
        <>
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
          <CheckBoxComponent id="admin" checked={profileDetails.admin} onChange={updateProfileDetails} label="Admin" />
          <CheckBoxComponent
            id="totaalToto"
            checked={profileDetails.totaalToto}
            onChange={updateProfileDetails}
            label="Totaal Toto"
          />

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
        </>
      }
      submitButton={<SubmitButtonComponent caption="UPDATE PROFIEL" color="primary" handleClick={submitForm} />}
      link={<Link to="/profiel/password">Change Password</Link>}
    />
  );
};

export default EditProfileForm;
