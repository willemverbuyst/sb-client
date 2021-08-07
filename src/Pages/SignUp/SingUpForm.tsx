import React, { ChangeEvent, ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SubmitButtonComponent from '../../Components/Button/SubmitButton';
import CheckBoxComponent from '../../Components/Form/CheckBox';
import FormContainer from '../../Components/Form/FormContainer';
import PasswordFieldComponent from '../../Components/Form/PasswordField';
import SelectorComponent from '../../Components/Form/Selector';
import TextFieldComponent from '../../Components/Form/TextField';
import { ISignUpCredentials } from '../../models/credentials.model';
import { ITeamForSelector } from '../../models/toto.models';
import { addPlayer } from '../../store/players/action-creators';

interface IProps {
  teams: ITeamForSelector[];
}

const SignUpForm: React.FC<IProps> = ({ teams }: IProps): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [
    signUpCredentials,
    setSignUpCredentials,
  ] = useState<ISignUpCredentials>({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    totaalToto: true,
    teamId: '',
  });

  const submitForm = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    dispatch(addPlayer(signUpCredentials));

    setSignUpCredentials({
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      totaalToto: true,
      teamId: '',
    });

    history.push('/spelers');
  };

  const updateSignUpCredentials = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newValue =
      event.target.id === 'totaalToto'
        ? event.target.checked
        : event.target.value;

    setSignUpCredentials({
      ...signUpCredentials,
      [event.target.id]: newValue,
    });
  };

  const updateFavoriteTeam = (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>,
  ): void => {
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
          <CheckBoxComponent
            id="totaalToto"
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
          <SelectorComponent
            label="Team"
            labelId="favTeam"
            id="teamId"
            value={signUpCredentials.teamId}
            onChange={updateFavoriteTeam}
            options={teams}
          />
        </>
      }
      submitButton={
        <SubmitButtonComponent
          caption="SIGN UP"
          color="primary"
          handleClick={submitForm}
        />
      }
    />
  );
};

export default SignUpForm;
