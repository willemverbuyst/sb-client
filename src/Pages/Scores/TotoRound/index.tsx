import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import PageTitle from '../../../Components/Title/PageTitle';
import ScoresBarChart from '../../../Sections/Charts/ScoresBarChart';
import PageContent from '../../../Sections/PageContent';
import { fetchScoresTotoRound } from '../../../store/scores/action-creators';
import {
  selectScoresTotoRoundSortedByScore,
  selectTotoRoundId,
} from '../../../store/scores/selectors';
import Pagination from './Pagination';

const TotoRound: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const scoresRoundSortedByScore = useSelector(
    selectScoresTotoRoundSortedByScore,
  );
  const totoRoundId = useSelector(selectTotoRoundId);
  const { totoronde } = useParams<{ totoronde: string }>();
  const totoRound = Number(totoronde);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!totoRoundId || totoRound !== totoRoundId) {
      (async () => {
        await dispatch(fetchScoresTotoRound(totoRound));
        if (!scoresRoundSortedByScore) {
          setMessage(`Nog geen scores voor totoronde`);
        }
      })();
    }
  }, [dispatch, totoRound, totoRoundId]);

  return (
    <PageContent
      loadingText=""
      content={
        <>
          <PageTitle title={`Totoronde  ${totoRound}`} color="secondary" />
          {scoresRoundSortedByScore && scoresRoundSortedByScore.length ? (
            <>
              <Pagination totoRound={totoRound} />
              <ScoresBarChart scores={scoresRoundSortedByScore} />
            </>
          ) : (
            <MessageComponent message={message} />
          )}
        </>
      }
    />
  );
};

export default TotoRound;
