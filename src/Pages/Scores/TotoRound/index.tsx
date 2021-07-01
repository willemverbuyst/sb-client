import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import PageTitle from '../../../Components/Title/PageTitle';
import ScoresBarChart from '../../../Sections/Charts/ScoresBarChart';
import PageContent from '../../../Sections/PageContent';
import { fetchScoresTotoRound } from '../../../store/scores/action-creators';
import { selectScoresTotoRoundSortedByScore, selectTotoRoundId } from '../../../store/scores/selectors';
import Pagination from './Pagination';

const TotoRound: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const scoresRoundSortedByScore = useSelector(selectScoresTotoRoundSortedByScore);
  const totoRoundId = useSelector(selectTotoRoundId);
  const { totoronde } = useParams<{ totoronde: string }>();
  const totoRound = Number(totoronde);

  useEffect(() => {
    if (!totoRoundId || totoRound !== totoRoundId) {
      dispatch(fetchScoresTotoRound(totoRound));
    }
  }, [dispatch, totoRound, totoRoundId]);

  return (
    <PageContent
      loadingText="Totoronde"
      content={
        scoresRoundSortedByScore ? (
          <>
            <PageTitle title={`Totoronde  ${totoRound}`} color="secondary" />
            <ScoresBarChart scores={scoresRoundSortedByScore} />
            <Pagination totoRound={totoRound} />
          </>
        ) : (
          <MessageComponent message={`Nog geen scores voor toto ronde ${totoRound}`} />
        )
      }
    />
  );
};

export default TotoRound;
