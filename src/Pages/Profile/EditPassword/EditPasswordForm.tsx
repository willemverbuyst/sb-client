import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import SubmitButtonComponent from '../../../Components/Button/SubmitButton';
import ShowAlertComponent from '../../../Components/Communication/Alert';
import FormContainer from '../../../Components/Form/FormContainer';
import PasswordFieldComponent from '../../../Components/Form/PasswordField';
import { changePassword } from '../../../store/user/action-creators';

const EditPasswordForm: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const submitForm = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    if (password1 === password2) {
      dispatch(changePassword(password1));
    } else {
      setShowAlert(true);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    setPassword1('');
    setPassword2('');
  };

  const updatePassword1 = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword1(event.target.value);
  const updatePassword2 = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword2(event.target.value);

  return (
    <>
      <FormContainer
        inputFields={
          <>
            <PasswordFieldComponent
              id="password1"
              label="Password"
              value={password1}
              onChange={updatePassword1}
            />
            <PasswordFieldComponent
              id="password2"
              label="Password"
              value={password2}
              onChange={updatePassword2}
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
        link={<Link to="/profiel/edit">Edit Profile</Link>}
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
