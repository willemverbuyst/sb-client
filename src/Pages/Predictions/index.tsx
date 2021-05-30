import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import MessageComponent from '../../Components/Communication/Message';
import PageHeaderWithButton from '../../Components/Header/PageHeaderWithBtn';
import { fetchAllFixtures } from '../../store/predictions/action-creators';
import { selectFixtures } from '../../store/predictions/selectors';
import PageContent from '../Sections/PageContent';
import FixturesSection from './FixturesSection';
import PaginationSection from './PaginationSection';

const Predictions: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const fixtures = useSelector(selectFixtures);
  const { totoronde } = useParams<{ totoronde: string }>();
  const { ronde } = useParams<{ ronde: string }>();

  useEffect(() => {
    if (!fixtures) {
      dispatch(fetchAllFixtures());
    }
  }, [dispatch, fixtures]);

  const gotoRanking = () => history.push(`/klassement/ronde/${ronde}`);

  return (
    <PageContent
      loadingText="Voorspellingen"
      content={
        fixtures ? (
          <>
            <PageHeaderWithButton
              title="Voorspellingen"
              captionBtn="KLASSEMENT"
              colorBtn="secondary"
              handleClick={gotoRanking}
            />
            <FixturesSection fixtures={fixtures} totoronde={totoronde} ronde={ronde} />
            <PaginationSection totoronde={totoronde} ronde={ronde} />
          </>
        ) : (
          <MessageComponent message={`Geen voorspellingen gevonden`} />
        )
      }
    />
  );
};

export default Predictions;
