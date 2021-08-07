import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MessageComponent from '../../Components/Communication/Message';
import ProgressComponent from '../../Components/Progress';
import PageTitle from '../../Components/Title/PageTitle';
import { selectAppLoading } from '../../store/appState/selectors';
import { fetchAllTeams } from '../../store/teams/action-creators';
import { selectTeams } from '../../store/teams/selectors';
import { selectUser } from '../../store/user/selectors';
import SignUpForm from './SingUpForm';

const SignUp: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector(selectAppLoading);
  const teams = useSelector(selectTeams);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!teams) {
      dispatch(fetchAllTeams());
    }
  }, [dispatch, teams]);

  useEffect(() => {
    if (user && !user.admin) history.push('/page-not-found');
  });

  return (
    <Box>
      <PageTitle title="Sign up" color="secondary" />
      {isLoading ? (
        <ProgressComponent />
      ) : teams ? (
        <SignUpForm teams={teams} />
      ) : (
        <MessageComponent message="Geen teams gevonden voor de signup, probeer het later nog eens" />
      )}
    </Box>
  );
};

export default SignUp;
