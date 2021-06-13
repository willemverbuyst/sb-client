import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import PageHeaderWithButton from '../../../Components/Header/PageHeaderWithBtn';
import { fetchPlayerProfile } from '../../../store/players/action-creators';
import { selectPastFixturesWithScoresSortedByTime, selectUserNamePlayer } from '../../../store/players/selectors';
import { calculateIndex } from '../../../utils/parameterFunctions';
import PageContent from '../../Sections/PageContent';
import Predictions from '../../Sections/Predictions';
import PaginationSection from './PaginationSection';

const PredictionsPlayer: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userNamePlayer = useSelector(selectUserNamePlayer);
  const pastFixturesWithScoresSortedByTime = useSelector(selectPastFixturesWithScoresSortedByTime);
  const { id } = useParams<{ id: string }>();
  const { ronde } = useParams<{ ronde: string }>();
  const { totoronde } = useParams<{ totoronde: string }>();

  const t = Number(totoronde);
  const r = Number(ronde);

  const name = userNamePlayer ? userNamePlayer : 'Speler...';

  useEffect(() => {
    dispatch(fetchPlayerProfile(Number(id)));
  }, [dispatch, id]);

  const filteredFixtures = pastFixturesWithScoresSortedByTime
    ? [...pastFixturesWithScoresSortedByTime[t - 1][calculateIndex(r)]]
    : null;

  const gotoRanking = () => history.push(`/klassement/totoronde/${totoronde}`);

  return (
    <PageContent
      loadingText="Voorspellingen"
      content={
        filteredFixtures && userNamePlayer ? (
          <>
            <PageHeaderWithButton
              title={`Voorspellingen ${name}`}
              captionBtn={`KLASSEMENT TOTORONDE ${totoronde}`}
              colorBtn="secondary"
              handleClick={gotoRanking}
            />
            <Predictions fixtures={filteredFixtures} display="public" userNamePlayer={userNamePlayer} />
            <PaginationSection totoronde={totoronde} ronde={ronde} id={id} />
          </>
        ) : (
          <MessageComponent message={`Geen voorspellingen voor gevonden`} />
        )
      }
    />
  );
};

export default PredictionsPlayer;
