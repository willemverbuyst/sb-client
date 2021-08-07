import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MessageComponent from '../../../Components/Communication/Message';
import ProgressComponent from '../../../Components/Progress';
import PageTitle from '../../../Components/Title/PageTitle';
import { selectAppLoading } from '../../../store/appState/selectors';
import { fetchAllTeams } from '../../../store/teams/action-creators';
import { selectTeams } from '../../../store/teams/selectors';
import { selectUser } from '../../../store/user/selectors';
import EditProfileForm from './EditProfileForm';

const EditProfile: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const teams = useSelector(selectTeams);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!teams) {
      dispatch(fetchAllTeams());
    }
  }, [dispatch, teams]);

  return (
    <Box>
      <PageTitle title="Profiel" color="primary" />
      {isLoading ? (
        <ProgressComponent />
      ) : user && teams ? (
        <EditProfileForm user={user} teams={teams} />
      ) : (
        <MessageComponent message="Geen profiel gevonden" />
      )}
    </Box>
  );
};

export default EditProfile;
