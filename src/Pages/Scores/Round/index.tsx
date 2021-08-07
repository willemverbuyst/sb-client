import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import ProgressComponent from '../../../Components/Progress';
import PageTitle from '../../../Components/Title/PageTitle';
import ScoresBarChart from '../../../Sections/Charts/ScoresBarChart';
import Guard from '../../../Sections/Guard';
import { selectAppLoading } from '../../../store/appState/selectors';
import { fetchScoresRound } from '../../../store/scores/action-creators';
import {
  selectRoundId,
  selectScoresRoundSortedByScore,
} from '../../../store/scores/selectors';
import { selectToken } from '../../../store/user/selectors';
import Pagination from './Pagination';

const Round: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const roundId = useSelector(selectRoundId);
  const scoresRoundSortedByScore = useSelector(selectScoresRoundSortedByScore);
  const token = useSelector(selectToken);
  const { ronde } = useParams<{ ronde: string }>();
  const round = Number(ronde);

  useEffect(() => {
    if (token && (!roundId || round !== roundId)) {
      dispatch(fetchScoresRound(round));
    }
  }, [dispatch, round, roundId, token]);

  return (
    <Guard
      content={
        <Box>
          <PageTitle title={`Speelronde ${round}`} color="secondary" />
          {isLoading ? (
            <ProgressComponent />
          ) : scoresRoundSortedByScore && scoresRoundSortedByScore.length ? (
            <>
              <Pagination round={round} />
              <ScoresBarChart scores={scoresRoundSortedByScore} />
            </>
          ) : (
            <>
              <MessageComponent
                message={`Nog geen scores voor speelronde ${round}`}
              />
              <Pagination round={round} />
            </>
          )}
        </Box>
      }
    />
  );
};

export default Round;
