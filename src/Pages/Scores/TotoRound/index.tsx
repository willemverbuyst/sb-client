import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import ScoresBarChart from '../../../Components/Chart/ScoresBarChart';
import DividerComponent from '../../../Components/Divider';
import Message from '../../../Components/Message';
import ProgressComponent from '../../../Components/Progress';
import SubTitleComponent from '../../../Components/Title/SubTitle';
import { selectAppLoading } from '../../../store/appState/selectors';
import { fetchScoresTotoRound } from '../../../store/scores/actions';
import { selectTotoRound } from '../../../store/scores/selectors';
import { UserWithScore } from '../../../store/scores/types';
import { selectToken } from '../../../store/user/selectors';
import BreadCrumbsSection from './BreadCrumbsSection';
import TopSection from './TopSection';

const TotoRound: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const token = useSelector(selectToken);
  const history = useHistory();
  const totoRound = useSelector(selectTotoRound);
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    if (!totoRound || (totoRound && +id !== +totoRound.id)) {
      dispatch(fetchScoresTotoRound(+id));
    }
  }, [dispatch, id, totoRound]);

  const totoRoundSortedByUserName: UserWithScore[] =
    totoRound && totoRound.usersWithScores
      ? [...totoRound.usersWithScores].sort((name1, name2) =>
          name1.user.toLowerCase().localeCompare(name2.user.toLowerCase()),
        )
      : [];

  return (
    <Box>
      <TopSection id={id} />

      {isLoading ? (
        <ProgressComponent />
      ) : totoRound && totoRound.usersWithScores && totoRound.usersWithScores.length > 0 ? (
        <>
          <SubTitleComponent text={`TOTO RONDE ${id}`} />
          <DividerComponent />
          <ScoresBarChart scores={totoRoundSortedByUserName} />
          <BreadCrumbsSection id={id} />
        </>
      ) : (
        <Message message={`Nog geen scores voor toto ronde ${id}`} />
      )}
    </Box>
  );
};

export default TotoRound;
