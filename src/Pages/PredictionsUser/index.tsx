import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import MessageComponent from '../../Components/Communication/Message';
import PageHeaderWithButton from '../../Components/Header/PageHeaderWithBtn';
import { IFixtureWithScoreAndPredictions } from '../../models/toto.models';
import { fetchAllFixtures } from '../../store/predictions/action-creators';
import { selectFixtures } from '../../store/predictions/selectors';
import { calculateIndex } from '../../utils/parameterFunctions';
import { sortArrayWithObjects } from '../../utils/sortFunctions';
import PageContent from '../Sections/PageContent';
import Predictions from '../Sections/Predictions';
import PaginationSection from './PaginationSection';

const PredictionsUser: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const fixtures = useSelector(selectFixtures);
  const { totoronde } = useParams<{ totoronde: string }>();
  const { ronde } = useParams<{ ronde: string }>();

  const t = Number(totoronde);
  const r = Number(ronde);

  useEffect(() => {
    if (!fixtures) {
      dispatch(fetchAllFixtures());
    }
  }, [dispatch, fixtures]);

  const filteredFixtures = fixtures ? [...fixtures[t - 1][calculateIndex(r)]] : null;

  const filteredAndSortedfixtures = filteredFixtures
    ? sortArrayWithObjects<keyof IFixtureWithScoreAndPredictions, IFixtureWithScoreAndPredictions>('eventTimeStamp')(
        filteredFixtures,
      )
    : null;

  const gotoRanking = () => history.push(`/klassement/ronde/${ronde}`);

  return (
    <PageContent
      loadingText="Voorspellingen"
      content={
        filteredAndSortedfixtures ? (
          <>
            <PageHeaderWithButton
              title="Voorspellingen"
              captionBtn="KLASSEMENT"
              colorBtn="secondary"
              handleClick={gotoRanking}
            />
            <Predictions fixtures={filteredAndSortedfixtures} display="public" />
            <PaginationSection totoronde={totoronde} ronde={ronde} />
          </>
        ) : (
          <MessageComponent message={`Geen voorspellingen gevonden`} />
        )
      }
    />
  );
};

export default PredictionsUser;
