import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import PageTitle from '../../../Components/Title/PageTitle';
import PageContent from '../../../Sections/PageContent';
import Predictions from '../../../Sections/Predictions';
import { getAllPredictions } from '../../../store/predictions/action-creators';
import {
  selectAllPredictionsSortedByTime,
  selectNameOfPlayerOfPredicitons,
} from '../../../store/predictions/selectors';
import * as UTILS from '../../../utils';
import Pagination from './Pagination';

const PredictionsPlayer: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const nameOfPlayerOfPredicitons = useSelector(
    selectNameOfPlayerOfPredicitons,
  );
  const allPredictionsSortedByTime = useSelector(
    selectAllPredictionsSortedByTime,
  );
  const { id } = useParams<{ id: string }>();
  const { ronde } = useParams<{ ronde: string }>();
  const { totoronde } = useParams<{ totoronde: string }>();
  const round = Number(ronde);
  const totoRound = Number(totoronde);
  const [message, setMessage] = useState('');

  const name = nameOfPlayerOfPredicitons
    ? nameOfPlayerOfPredicitons
    : 'Speler...';

  useEffect(() => {
    async () => {
      await dispatch(getAllPredictions(Number(id)));
      if (!allPredictionsSortedByTime) {
        setMessage(`Geen voorspellingen voor ${name} gevonden`);
      }
    };
  }, [dispatch, id]);

  const filteredFixtures = allPredictionsSortedByTime
    ? [
        ...allPredictionsSortedByTime[totoRound - 1][
          UTILS.calculateIndex(round)
        ],
      ]
    : null;

  return (
    <PageContent
      loadingText=""
      content={
        <>
          <PageTitle title={`Voorspellingen ${name}`} color="secondary" />
          {filteredFixtures && nameOfPlayerOfPredicitons ? (
            <>
              <Predictions
                predictions={filteredFixtures}
                display="public"
                userNamePlayer={nameOfPlayerOfPredicitons}
              />
              <Pagination totoround={totoRound} round={round} id={id} />
            </>
          ) : (
            <MessageComponent message={message} />
          )}
        </>
      }
    />
  );
};

export default PredictionsPlayer;
