import { Link } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';

import SubmitButtonComponent from '../../../Components/Button/SubmitButton';
import ShowAlertComponent from '../../../Components/Communication/Alert';
import FormContainer from '../../../Components/Form/FormContainer';
import PasswordFieldComponent from '../../../Components/Form/PasswordField';
import { changePassword } from '../../../store/user/action-creators';

const EditPasswordForm: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const submitForm = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    if (newPassword === confirmPassword) {
      dispatch(changePassword(newPassword));
    } else {
      setShowAlert(true);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const updateOldPassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setOldPassword(event.target.value);
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
              id="oldPassword"
              label="Old Password"
              value={oldPassword}
              onChange={updateOldPassword}
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
        link={<Link href="/profiel/edit">Edit Profile</Link>}
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
