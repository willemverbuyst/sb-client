import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import ScoresBarChart from '../../../Components/Chart/ScoresBarChart';
import MessageComponent from '../../../Components/Communication/Message';
import DividerComponent from '../../../Components/Divider';
import PageHeaderWithButton from '../../../Components/Header/PageHeaderWithBtn';
import ProgressComponent from '../../../Components/Progress';
import SubTitleComponent from '../../../Components/Title/SubTitle';
import { TOTAL_ROUNDS } from '../../../constants/setupGame';
import { selectAppLoading } from '../../../store/appState/selectors';
import { fetchScoresRound } from '../../../store/scores/actions';
import { selectRound } from '../../../store/scores/selectors';
import { UserWithScore } from '../../../store/scores/types';
import { selectToken } from '../../../store/user/selectors';
import { sortArrayWithObjects } from '../../../utils/sortFunctions';
import BreadCrumbsSection from './BreadCrumbsSection';

const Round: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();
  const round = useSelector(selectRound);
  const isLoading = useSelector(selectAppLoading);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    if (!round || (round && +id !== +round.id)) {
      dispatch(fetchScoresRound(+id));
    }
  }, [dispatch, id, round]);

  const roundSortedByName: UserWithScore[] =
    round && round.usersWithScores
      ? sortArrayWithObjects<keyof UserWithScore, UserWithScore>('user')(round.usersWithScores)
      : [];

  const gotoPredictions = () => {
    const t = +id !== TOTAL_ROUNDS ? Math.floor((+id - 1) / 3) + 1 : Math.floor((+id - 2) / 3) + 1;

    history.push(`/voorspellingen/${t}/${+id}`);
  };

  return (
    <Box>
      <PageHeaderWithButton
        title="Klassement"
        captionBtn="MIJN VOORSPELLINGEN"
        colorBtn="primary"
        handleClick={gotoPredictions}
      />

      {isLoading ? (
        <ProgressComponent />
      ) : round && round.usersWithScores && round.usersWithScores.length > 0 ? (
        <>
          <SubTitleComponent text={`RONDE ${id}`} />
          <DividerComponent />
          <ScoresBarChart scores={roundSortedByName} />
          <BreadCrumbsSection id={id} />
        </>
      ) : (
        <MessageComponent message={`Nog geen scores voor deze ronde`} />
      )}
    </Box>
  );
};

export default Round;
