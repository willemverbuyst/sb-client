import React, { ReactElement, useEffect } from 'react';
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

  const name = nameOfPlayerOfPredicitons
    ? nameOfPlayerOfPredicitons
    : 'Speler...';

  useEffect(() => {
    dispatch(getAllPredictions(Number(id)));
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
      loadingText="Voorspellingen"
      content={
        filteredFixtures && nameOfPlayerOfPredicitons ? (
          <>
            <PageTitle title={`Voorspellingen ${name}`} color="secondary" />
            <Predictions
              predictions={filteredFixtures}
              display="public"
              userNamePlayer={nameOfPlayerOfPredicitons}
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
