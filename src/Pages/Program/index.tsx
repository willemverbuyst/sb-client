import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MessageComponent from '../../Components/Message';
import ProgressComponent from '../../Components/Progress';
import { selectAppLoading } from '../../store/appState/selectors';
import { fetchCurrentRound } from '../../store/predictions/actions';
import { selectCurrentRound } from '../../store/predictions/selectors';
import { selectToken } from '../../store/user/selectors';
import FixturesSection from './FixturesSection';
import TopSection from './TopSection';

const Program: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentRound = useSelector(selectCurrentRound);
  const isLoading = useSelector(selectAppLoading);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    if (!currentRound) {
      dispatch(fetchCurrentRound());
    }
  }, [dispatch, currentRound]);

  return (
    <Box>
      <TopSection />

      {isLoading ? (
        <ProgressComponent />
      ) : currentRound ? (
        <FixturesSection currentRound={currentRound} />
      ) : (
        <MessageComponent message={`Er staan voor deze week geen wedstrijden gepland.`} />
      )}
    </Box>
  );
};

export default Program;
