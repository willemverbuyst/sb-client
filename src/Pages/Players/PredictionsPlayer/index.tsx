import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import PageTitle from '../../../Components/Title/PageTitle';
import PageContent from '../../../Sections/PageContent';
import Predictions from '../../../Sections/Predictions';
import { fetchPlayerProfile } from '../../../store/players/action-creators';
import { selectPastFixturesWithScoresSortedByTime, selectUserNamePlayer } from '../../../store/players/selectors';
import * as UTILS from '../../../utils';
import Pagination from './Pagination';

const PredictionsPlayer: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
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
    ? [...pastFixturesWithScoresSortedByTime[t - 1][UTILS.calculateIndex(r)]]
    : null;

  return (
    <PageContent
      loadingText="Voorspellingen"
      content={
        filteredFixtures && userNamePlayer ? (
          <>
            <PageTitle title={`Voorspellingen ${name}`} color="secondary" />
            <Predictions fixtures={filteredFixtures} display="public" userNamePlayer={userNamePlayer} />
            <Pagination totoround={totoronde} round={ronde} id={id} />
          </>
        ) : (
          <MessageComponent message={`Geen voorspellingen voor gevonden`} />
        )
      }
    />
  );
};

export default PredictionsPlayer;
