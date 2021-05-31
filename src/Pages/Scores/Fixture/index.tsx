import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import DividerComponent from '../../../Components/Divider';
import PageHeaderWithButton from '../../../Components/Header/PageHeaderWithBtn';
import { IPredictionWithScorePerUser } from '../../../models/scores.models';
import { fetchScoresFixture } from '../../../store/scores/action-creators';
import { selectFixture } from '../../../store/scores/selectors';
import { sortArrayWithObjects } from '../../../utils/sortFunctions';
import PageContent from '../../Sections/PageContent';
import FixtureSection from './FixtureSection';
import ScoresFixtureBarChart from './ScoresFixtureBarChart';

const Fixture: React.FC = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();
  const fixtureWithScores = useSelector(selectFixture);

  useEffect(() => {
    dispatch(fetchScoresFixture(+id));
  }, [dispatch, id]);

  const scoresSortedByName: IPredictionWithScorePerUser[] =
    fixtureWithScores && fixtureWithScores.scores
      ? sortArrayWithObjects<keyof IPredictionWithScorePerUser, IPredictionWithScorePerUser>('user')(
          fixtureWithScores.scores,
        )
      : [];

  const goBack = () => history.goBack();

  return (
    <PageContent
      loadingText="Uitslag"
      content={
        fixtureWithScores ? (
          <>
            <PageHeaderWithButton title="Uitslag" captionBtn="TERUG" colorBtn="primary" handleClick={goBack} />
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
        )
      }
    />
  );
};

export default Fixture;
