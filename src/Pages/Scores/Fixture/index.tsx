import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import DividerComponent from '../../../Components/Divider';
import PageHeaderWithButton from '../../../Components/Header/PageHeaderWithBtn';
import { fetchScoresFixture } from '../../../store/scores/action-creators';
import { selectFixture, selectScoresForFixtureSortedByName } from '../../../store/scores/selectors';
import PageContent from '../../Sections/PageContent';
import FixtureSection from './FixtureSection';
import ScoresForFixtureBarChart from './ScoresFixtureBarChart';

const Fixture: React.FC = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();
  const fixture = useSelector(selectFixture);
  const scoresFixtureSortedByName = useSelector(selectScoresForFixtureSortedByName);

  useEffect(() => {
    dispatch(fetchScoresFixture(+id));
  }, [dispatch, id]);

  const goBack = () => history.goBack();

  return (
    <PageContent
      loadingText="Uitslag"
      content={
        fixture ? (
          <>
            <PageHeaderWithButton title="Uitslag" captionBtn="TERUG" colorBtn="primary" handleClick={goBack} />
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
