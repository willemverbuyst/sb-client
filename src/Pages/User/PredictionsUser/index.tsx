import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import PageTitle from '../../../Components/Title/PageTitle';
import PageContent from '../../../Sections/PageContent';
import Predictions from '../../../Sections/Predictions';
import { getAllPredictions } from '../../../store/predictions/action-creators';
import { selectAllPredictionsSortedByTime } from '../../../store/predictions/selectors';
import { selectUserId } from '../../../store/user/selectors';
import * as UTILS from '../../../utils';
import Pagination from './Pagination';

const PredictionsUser: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const predictionsSortedByTime = useSelector(selectAllPredictionsSortedByTime);
  const id = useSelector(selectUserId);
  const { ronde } = useParams<{ ronde: string }>();
  const { totoronde } = useParams<{ totoronde: string }>();
  const round = Number(ronde);
  const totoRound = Number(totoronde);

  useEffect(() => {
    if (!predictionsSortedByTime && id) {
      dispatch(getAllPredictions(id));
    }
  }, [dispatch, predictionsSortedByTime]);

  const filteredPredictions = predictionsSortedByTime
    ? [...predictionsSortedByTime[totoRound - 1][UTILS.calculateIndex(round)]]
    : null;

  return (
    <PageContent
      loadingText="Mijn voorspellingen"
      content={
        filteredPredictions ? (
          <>
            <PageTitle title="Mijn voorspellingen" color="primary" />
            <Predictions fixtures={filteredPredictions} display="private" />
            <Pagination totoround={totoRound} round={round} />
          </>
        ) : (
          <MessageComponent message="Geen voorspellingen gevonden" />
        )
      }
    />
  );
};

export default PredictionsUser;
