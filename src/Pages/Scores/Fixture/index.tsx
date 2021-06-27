import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import DividerComponent from '../../../Components/Divider';
import PageTitle from '../../../Components/Title/PageTitle';
import PageContent from '../../../Sections/PageContent';
import { fetchScoresFixture } from '../../../store/scores/action-creators';
import { selectFixture, selectScoresForFixtureSortedByName } from '../../../store/scores/selectors';
import FixtureSection from './FixtureSection';
import ScoresForFixtureBarChart from './ScoresFixtureBarChart';

const Fixture: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const fixture = useSelector(selectFixture);
  const scoresFixtureSortedByName = useSelector(selectScoresForFixtureSortedByName);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(fetchScoresFixture(+id));
  }, [dispatch, id]);

  return (
    <PageContent
      loadingText="Uitslag"
      content={
        fixture ? (
          <>
            <PageTitle title="Uitslag" color="secondary" />
            <FixtureSection fixture={fixture} />
            <DividerComponent />
            {scoresFixtureSortedByName ? (
              <ScoresForFixtureBarChart scores={scoresFixtureSortedByName} />
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
