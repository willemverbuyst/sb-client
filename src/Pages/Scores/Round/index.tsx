import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import PageTitle from '../../../Components/Title/PageTitle';
import ScoresBarChart from '../../../Sections/Charts/ScoresBarChart';
import PageContent from '../../../Sections/PageContent';
import { fetchScoresRound } from '../../../store/scores/action-creators';
import { selectRoundId, selectScoresRoundSortedByScore } from '../../../store/scores/selectors';
import PaginationSection from './PaginationSection';

const Round: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const roundId = useSelector(selectRoundId);
  const scoresRoundSortedByScore = useSelector(selectScoresRoundSortedByScore);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!roundId || Number(id) !== roundId) {
      dispatch(fetchScoresRound(+id));
    }
  }, [dispatch, id, roundId]);

  return (
    <PageContent
      loadingText="Speelronde"
      content={
        scoresRoundSortedByScore ? (
          <>
            <PageTitle title={`Speelronde ${id}`} color="secondary" />
            <ScoresBarChart scores={scoresRoundSortedByScore} />
            <PaginationSection round={id} />
          </>
        ) : (
          <MessageComponent message={`Nog geen scores voor deze ronde`} />
        )
      }
    />
  );
};

export default Round;
