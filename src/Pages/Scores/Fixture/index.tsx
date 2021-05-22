import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import ScoresFixtureBarChart from '../../../Components/Chart/ScoresFixtureBarChart';
import DividerComponent from '../../../Components/Divider';
import Message from '../../../Components/Message';
import ProgressComponent from '../../../Components/Progress';
import { selectAppLoading } from '../../../store/appState/selectors';
import { fetchScoresFixture } from '../../../store/scores/actions';
import { selectFixture } from '../../../store/scores/selectors';
import { PredictionWithScorePerUser } from '../../../store/scores/types';
import { selectToken } from '../../../store/user/selectors';
import { sortValues } from '../../../utils/sortFunctions';
import FixtureSection from './FixtureSection';
import TopSection from './TopSection';

const Fixture: React.FC = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { id } = useParams<{ id: string }>();
  const fixture = useSelector(selectFixture);
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    dispatch(fetchScoresFixture(+id));
  }, [dispatch, id]);

  const scoresSortedByName: PredictionWithScorePerUser[] =
    fixture && fixture.scores
      ? sortValues<keyof PredictionWithScorePerUser, PredictionWithScorePerUser>('user')(fixture.scores)
      : [];

  return (
    <Box>
      <TopSection />

      {isLoading ? (
        <ProgressComponent />
      ) : fixture ? (
        <>
          <FixtureSection fixture={fixture} />
          <DividerComponent />
          {fixture.scores ? <ScoresFixtureBarChart scores={scoresSortedByName} /> : <Message message={`Geen scores`} />}
        </>
      ) : (
        <Message message={`Geen wedstrijd gevonden`} />
      )}
    </Box>
  );
};

export default Fixture;
