import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import PageTitle from '../../../Components/Title/PageTitle';
import { fetchScoresTotoRound } from '../../../store/scores/action-creators';
import { selectScoresTotoRoundSortedByScore, selectTotoRoundId } from '../../../store/scores/selectors';
import ScoresBarChart from '../../Sections/Charts/ScoresBarChart';
import PageContent from '../../Sections/PageContent';
import PaginationSection from './PaginationSection';

const TotoRound: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const scoresRoundSortedByScore = useSelector(selectScoresTotoRoundSortedByScore);
  const totoRoundId = useSelector(selectTotoRoundId);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!totoRoundId || Number(id) !== totoRoundId) {
      dispatch(fetchScoresTotoRound(+id));
    }
  }, [dispatch, id, totoRoundId]);

  return (
    <PageContent
      loadingText="Totoronde"
      content={
        scoresRoundSortedByScore ? (
          <>
            <PageTitle title={`Totoronde  ${id}`} color="secondary" />
            <ScoresBarChart scores={scoresRoundSortedByScore} />
            <PaginationSection totoRound={id} />
          </>
        ) : (
          <MessageComponent message={`Nog geen scores voor toto ronde ${id}`} />
        )
      }
    />
  );
};

export default TotoRound;
