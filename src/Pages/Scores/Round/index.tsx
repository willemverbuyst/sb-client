import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import PageTitle from '../../../Components/Title/PageTitle';
import ScoresBarChart from '../../../Sections/Charts/ScoresBarChart';
import PageContent from '../../../Sections/PageContent';
import { fetchScoresRound } from '../../../store/scores/action-creators';
import {
  selectRoundId,
  selectScoresRoundSortedByScore,
} from '../../../store/scores/selectors';
import Pagination from './Pagination';

const Round: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const roundId = useSelector(selectRoundId);
  const scoresRoundSortedByScore = useSelector(selectScoresRoundSortedByScore);
  const { ronde } = useParams<{ ronde: string }>();
  const round = Number(ronde);

  useEffect(() => {
    if (!roundId || round !== roundId) {
      dispatch(fetchScoresRound(round));
    }
  }, [dispatch, round, roundId]);

  return (
    <PageContent
      loadingText="Speelronde"
      content={
        scoresRoundSortedByScore && scoresRoundSortedByScore.length ? (
          <>
            <PageTitle title={`Speelronde ${round}`} color="secondary" />
            <Pagination round={round} />
            <ScoresBarChart scores={scoresRoundSortedByScore} />
          </>
        ) : (
          <MessageComponent
            message={`Nog geen scores voor speelronde ${round}`}
          />
        )
      }
    />
  );
};

export default Round;
