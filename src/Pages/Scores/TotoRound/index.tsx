import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import ProgressComponent from '../../../Components/Progress';
import PageTitle from '../../../Components/Title/PageTitle';
import ScoresBarChart from '../../../Sections/Charts/ScoresBarChart';
import { selectAppLoading } from '../../../store/appState/selectors';
import { fetchScoresTotoRound } from '../../../store/scores/action-creators';
import {
  selectScoresTotoRoundSortedByScore,
  selectTotoRoundId,
} from '../../../store/scores/selectors';
import Pagination from './Pagination';

const TotoRound: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const scoresRoundSortedByScore = useSelector(
    selectScoresTotoRoundSortedByScore,
  );
  const totoRoundId = useSelector(selectTotoRoundId);
  const { totoronde } = useParams<{ totoronde: string }>();
  const totoRound = Number(totoronde);

  useEffect(() => {
    if (!totoRoundId || totoRound !== totoRoundId) {
      dispatch(fetchScoresTotoRound(totoRound));
    }
  }, [dispatch, totoRound, totoRoundId]);

  return (
    <Box>
      <PageTitle title={`Totoronde ${totoRound}`} color="secondary" />
      {isLoading ? (
        <ProgressComponent />
      ) : scoresRoundSortedByScore && scoresRoundSortedByScore.length ? (
        <>
          <Pagination totoRound={totoRound} />
          <ScoresBarChart scores={scoresRoundSortedByScore} />
        </>
      ) : (
        <MessageComponent message="Nog geen scores voor totoronde" />
      )}
    </Box>
  );
};

export default TotoRound;
