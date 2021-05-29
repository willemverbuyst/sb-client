import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SubmitButtonComponent from '../../Components/Button/SubmitButton';
import CheckBoxComponent from '../../Components/Form/CheckBox';
import FormContainer from '../../Components/Form/FormContainer';
import PasswordFieldComponent from '../../Components/Form/PasswordField';
import SelectorComponent from '../../Components/Form/Selector';
import TextFieldComponent from '../../Components/Form/TextField';
import { ISignUpCredentials } from '../../models/credentials.model';
import { ButtonEvent } from '../../models/events.model';
import { addPlayer } from '../../store/players/actions';
import { fetchAllTeams } from '../../store/teams/actions';
import { selectTeams } from '../../store/teams/selectors';
import * as HELPERS from '../Profile/EditProfile/helpers';

const SignUpForm: React.FC = (): ReactElement => {
  const teams = useSelector(selectTeams);
  const history = useHistory();
  const dispatch = useDispatch();

  const [signUpCredentials, setSignUpCredentials] = useState<ISignUpCredentials>({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    admin: false,
    totaalToto: true,
    teamId: '',
  });

  const teamsForSelector = teams ? HELPERS.getTeamsForSelector(teams) : null;

  useEffect(() => {
    if (!teams) {
      dispatch(fetchAllTeams());
    }
  }, [dispatch, teams]);

  const submitForm = (e: ButtonEvent): void => {
    e.preventDefault();

    dispatch(addPlayer(signUpCredentials));

    setSignUpCredentials({
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      admin: false,
      totaalToto: true,
      teamId: '',
    });

    history.push('/spelers');
  };

  const updateSignUpCredentials = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue =
      event.target.id === 'admin' || event.target.id === 'totaalToto' ? !!event.target.value : event.target.value;

    setSignUpCredentials({
      ...signUpCredentials,
      [event.target.id]: newValue,
    });
  };

  const updateFavoriteTeam = (event: ChangeEvent<{ name?: string | undefined; value: unknown }>): void => {
    if (typeof event.target.value === 'number' || event.target.value === '') {
      setSignUpCredentials({
        ...signUpCredentials,
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
            value={signUpCredentials.userName}
            onChange={updateSignUpCredentials}
          />
          <TextFieldComponent
            id="firstName"
            label="First Name"
            value={signUpCredentials.firstName}
            onChange={updateSignUpCredentials}
          />
          <TextFieldComponent
            id="lastName"
            label="Last Name"
            value={signUpCredentials.lastName}
            onChange={updateSignUpCredentials}
          />
          <TextFieldComponent
            id="email"
            label="Email Address"
            value={signUpCredentials.email}
            onChange={updateSignUpCredentials}
          />
          <CheckBoxComponent checked={signUpCredentials.admin} onChange={updateSignUpCredentials} label="Admin" />
          <CheckBoxComponent
            checked={signUpCredentials.totaalToto}
            onChange={updateSignUpCredentials}
            label="Totaal Toto"
          />
          <PasswordFieldComponent
            id="password"
            label="Password"
            value={signUpCredentials.password}
            onChange={updateSignUpCredentials}
          />
          <TextFieldComponent
            id="phoneNumber"
            label="Phone Number"
            value={signUpCredentials.phoneNumber}
            onChange={updateSignUpCredentials}
          />
          {teamsForSelector ? (
            <SelectorComponent
              label="Team"
              labelId="favTeam"
              id="teamId"
              value={signUpCredentials.teamId}
              onChange={updateFavoriteTeam}
              options={teamsForSelector}
            />
          ) : null}
        </>
      }
      submitButton={<SubmitButtonComponent caption="SIGN UP" color="primary" handleClick={submitForm} />}
    />
  );
};

export default SignUpForm;