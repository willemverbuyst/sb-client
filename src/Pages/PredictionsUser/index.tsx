import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import MessageComponent from '../../Components/Communication/Message';
import PageHeaderWithButton from '../../Components/Header/PageHeaderWithBtn';
import { fetchAllFixtures } from '../../store/predictions/action-creators';
import { selectFixturesSortedByTime } from '../../store/predictions/selectors';
import { calculateIndex } from '../../utils/parameterFunctions';
import PageContent from '../Sections/PageContent';
import Predictions from '../Sections/Predictions';
import PaginationSection from './PaginationSection';

const PredictionsUser: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const fixturesSortedByTime = useSelector(selectFixturesSortedByTime);
  const { totoronde } = useParams<{ totoronde: string }>();
  const { ronde } = useParams<{ ronde: string }>();

  const t = Number(totoronde);
  const r = Number(ronde);

  useEffect(() => {
    if (!fixturesSortedByTime) {
      dispatch(fetchAllFixtures());
    }
  }, [dispatch, fixturesSortedByTime]);

  // [t- 1]: as an array starts at index 0, subtract 1 from the totoround number
  const filteredFixtures = fixturesSortedByTime ? [...fixturesSortedByTime[t - 1][calculateIndex(r)]] : null;

  const gotoRanking = () => history.push(`/klassement/ronde/${ronde}`);

  return (
    <PageContent
      loadingText="Voorspellingen"
      content={
        filteredFixtures ? (
          <>
            <PageHeaderWithButton
              title="Voorspellingen"
              captionBtn="KLASSEMENT"
              colorBtn="secondary"
              handleClick={gotoRanking}
            />
            <Predictions fixtures={filteredFixtures} display="private" />
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
