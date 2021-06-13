import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import DividerComponent from '../../../Components/Divider';
import PageHeaderWithoutButton from '../../../Components/Header/PageHeaderWithoutBtn';
import { fetchScoresFixture } from '../../../store/scores/action-creators';
import { selectFixture, selectScoresForFixtureSortedByName } from '../../../store/scores/selectors';
import PageContent from '../../Sections/PageContent';
import FixtureSection from './FixtureSection';
import ScoresForFixtureBarChart from './ScoresFixtureBarChart';

const Fixture: React.FC = (): ReactElement => {
  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();
  const fixture = useSelector(selectFixture);
  const scoresFixtureSortedByName = useSelector(selectScoresForFixtureSortedByName);

  useEffect(() => {
    dispatch(fetchScoresFixture(+id));
  }, [dispatch, id]);

  return (
    <PageContent
      loadingText="Uitslag"
      content={
        fixture ? (
          <>
            <PageHeaderWithoutButton title="Uitslag" />
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
