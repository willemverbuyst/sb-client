import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import PageHeaderWithoutButton from '../../Components/Header/PageHeaderWithoutBtn';
import { selectUser } from '../../store/user/selectors';
import PageContent from '../Sections/PageContent';
import SignUpForm from './SingUpForm';

const SignUp: React.FC = (): ReactElement => {
  const user = useSelector(selectUser);
  const history = useHistory();

  useEffect(() => {
    if (user && !user.admin) history.push('/page-not-found');
  });

  return (
    <PageContent
      loadingText="Sign Up"
      content={
        <>
          <PageHeaderWithoutButton title="Sign Up" />
          <SignUpForm />
        </>
      }
    />
  );
};

export default SignUp;
