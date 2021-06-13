import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import PageHeaderWithButton from '../../../Components/Header/PageHeaderWithBtn';
import { TOTAL_ROUNDS } from '../../../constants/setupGame';
import { fetchScoresRound } from '../../../store/scores/action-creators';
import { selectRoundId, selectScoresRoundSortedByScore } from '../../../store/scores/selectors';
import ScoresBarChart from '../../Sections/Charts/ScoresBarChart';
import PageContent from '../../Sections/PageContent';
import PaginationSection from './PaginationSection';

const Round: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const roundId = useSelector(selectRoundId);
  // const scoresRoundSortedByName = useSelector(selectScoresRoundSortedByName);
  const scoresRoundSortedByScore = useSelector(selectScoresRoundSortedByScore);

  useEffect(() => {
    if (!roundId || Number(id) !== roundId) {
      dispatch(fetchScoresRound(+id));
    }
  }, [dispatch, id, roundId]);

  const gotoPredictions = () => {
    const t = +id !== TOTAL_ROUNDS ? Math.floor((+id - 1) / 3) + 1 : Math.floor((+id - 2) / 3) + 1;

    history.push(`/voorspellingen/${t}/${+id}`);
  };

  return (
    <PageContent
      loadingText="Speelronde"
      content={
        scoresRoundSortedByScore ? (
          <>
            <PageHeaderWithButton
              title={`Speelronde ${id}`}
              captionBtn="MIJN VOORSPELLINGEN"
              colorBtn="primary"
              handleClick={gotoPredictions}
            />
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
