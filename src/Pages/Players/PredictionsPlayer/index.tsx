import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import PageTitle from '../../../Components/Title/PageTitle';
import PageContent from '../../../Sections/PageContent';
import Predictions from '../../../Sections/Predictions';
import { fetchPlayerProfile } from '../../../store/players/action-creators';
import {
  selectPastFixturesWithScoresSortedByTime,
  selectUserNamePlayer,
} from '../../../store/players/selectors';
import * as UTILS from '../../../utils';
import Pagination from './Pagination';

const PredictionsPlayer: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const userNamePlayer = useSelector(selectUserNamePlayer);
  const pastFixturesWithScoresSortedByTime = useSelector(
    selectPastFixturesWithScoresSortedByTime,
  );
  const { id } = useParams<{ id: string }>();
  const { ronde } = useParams<{ ronde: string }>();
  const { totoronde } = useParams<{ totoronde: string }>();
  const round = Number(ronde);
  const totoRound = Number(totoronde);

  const name = userNamePlayer ? userNamePlayer : 'Speler...';

  useEffect(() => {
    dispatch(fetchPlayerProfile(Number(id)));
  }, [dispatch, id]);

  const filteredFixtures = pastFixturesWithScoresSortedByTime
    ? [
        ...pastFixturesWithScoresSortedByTime[totoRound - 1][
          UTILS.calculateIndex(round)
        ],
      ]
    : null;

  return (
    <PageContent
      loadingText="Voorspellingen"
      content={
        filteredFixtures && userNamePlayer ? (
          <>
            <PageTitle title={`Voorspellingen ${name}`} color="secondary" />
            <Predictions
              fixtures={filteredFixtures}
              display="public"
              userNamePlayer={userNamePlayer}
            />
            <Pagination totoround={totoRound} round={round} id={id} />
          </>
        ) : (
          <MessageComponent
            message={`Geen voorspellingen voor ${name} gevonden`}
          />
        )
      }
    />
  );
};

export default PredictionsPlayer;
