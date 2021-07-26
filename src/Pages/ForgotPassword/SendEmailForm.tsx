import { Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';

import AvatarIconComponent from '../../Components/Avatar/AvatarIcon';
import SubmitButtonComponent from '../../Components/Button/SubmitButton';
import FormContainer from '../../Components/Form/FormContainer';
import TextFieldComponent from '../../Components/Form/TextField';
import { requestEmailForNewPassword } from '../../store/user/action-creators';

const SendEmailForm: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');

  const submitForm = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    dispatch(requestEmailForNewPassword(email));
    setEmail('');
  };

  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  return (
    <FormContainer
      inputFields={
        <>
          <AvatarIconComponent icon={<LockOutlinedIcon />} />
          <TextFieldComponent
            id="email"
            label="Email Address"
            value={email}
            onChange={updateEmail}
          />
        </>
      }
      submitButton={
        <SubmitButtonComponent
          caption="SEND EMAIL"
          color="primary"
          handleClick={submitForm}
        />
      }
      link={<Link href="/login">Back to login page?</Link>}
    />
  );
};

export default SendEmailForm;
