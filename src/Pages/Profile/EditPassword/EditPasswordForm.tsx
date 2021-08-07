import { Link } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';

import SubmitButtonComponent from '../../../Components/Button/SubmitButton';
import ShowAlertComponent from '../../../Components/Communication/Alert';
import FormContainer from '../../../Components/Form/FormContainer';
import PasswordFieldComponent from '../../../Components/Form/PasswordField';
import * as HISTORY from '../../../history';
import { changePassword } from '../../../store/user/action-creators';

const EditPasswordForm: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const [currentPassword, setcurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const submitForm = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    if (newPassword === confirmPassword) {
      dispatch(changePassword(currentPassword, newPassword, confirmPassword));
    } else {
      setShowAlert(true);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    setcurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const updateCurrentPassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setcurrentPassword(event.target.value);
  const updateNewPassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewPassword(event.target.value);
  const updateConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(event.target.value);

  return (
    <>
      <FormContainer
        inputFields={
          <>
            <PasswordFieldComponent
              id="currentPassword"
              label="Current Password"
              value={currentPassword}
              onChange={updateCurrentPassword}
            />
            <PasswordFieldComponent
              id="newPassword"
              label="New Password"
              value={newPassword}
              onChange={updateNewPassword}
            />
            <PasswordFieldComponent
              id="confirmPassword"
              label="Confirm Password"
              value={confirmPassword}
              onChange={updateConfirmPassword}
            />
          </>
        }
        submitButton={
          <SubmitButtonComponent
            caption="CHANGE PASSWORD"
            color="primary"
            handleClick={submitForm}
          />
        }
        link={
          <Link href="#" onClick={HISTORY.gotoProfile}>
            Edit Profile
          </Link>
        }
      />
      <ShowAlertComponent
        message="Passwords are not the same"
        displayAlert={showAlert}
        closeAlert={closeAlert}
      />
    </>
  );
};

export default EditPasswordForm;
