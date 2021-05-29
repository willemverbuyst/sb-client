import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import DividerComponent from '../../../Components/Divider';
import PageHeaderWithButton from '../../../Components/Header/PageHeaderWithBtn';
import ProgressComponent from '../../../Components/Progress';
import { selectAppLoading } from '../../../store/appState/selectors';
import { fetchScoresFixture } from '../../../store/scores/actions';
import { selectFixture } from '../../../store/scores/selectors';
import { PredictionWithScorePerUser } from '../../../store/scores/types';
import { selectToken } from '../../../store/user/selectors';
import { sortArrayWithObjects } from '../../../utils/sortFunctions';
import FixtureSection from './FixtureSection';
import ScoresFixtureBarChart from './ScoresFixtureBarChart';

const Fixture: React.FC = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { id } = useParams<{ id: string }>();
  const fixtureWithScores = useSelector(selectFixture);
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    dispatch(fetchScoresFixture(+id));
  }, [dispatch, id]);

  const scoresSortedByName: PredictionWithScorePerUser[] =
    fixtureWithScores && fixtureWithScores.scores
      ? sortArrayWithObjects<keyof PredictionWithScorePerUser, PredictionWithScorePerUser>('user')(
          fixtureWithScores.scores,
        )
      : [];

  const goBack = () => history.goBack();

  return (
    <Box>
      <PageHeaderWithButton title="Uitslag" captionBtn="TERUG" colorBtn="primary" handleClick={goBack} />

      {isLoading ? (
        <ProgressComponent />
      ) : fixtureWithScores ? (
        <>
          <FixtureSection fixture={fixtureWithScores.fixture} />
          <DividerComponent />
          {fixtureWithScores.scores ? (
            <ScoresFixtureBarChart scores={scoresSortedByName} />
          ) : (
            <MessageComponent message={`Nog geen scores`} />
          )}
        </>
      ) : (
        <MessageComponent message={`Geen wedstrijd gevonden`} />
      )}
    </Box>
  );
};

export default Fixture;
