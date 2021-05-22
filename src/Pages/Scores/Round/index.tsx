import { Box, Grid } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import ScoresBarChart from '../../../Components/Chart/ScoresBarChart';
import DividerComponent from '../../../Components/Divider';
import Message from '../../../Components/Message';
import ProgressComponent from '../../../Components/Progress';
import SubTitleComponent from '../../../Components/Title/SubTitle';
import { selectAppLoading } from '../../../store/appState/selectors';
import { fetchScoresRound } from '../../../store/scores/actions';
import { selectRound } from '../../../store/scores/selectors';
import { UserWithScore } from '../../../store/scores/types';
import { selectToken } from '../../../store/user/selectors';
import { sortValues } from '../../../utils/sortFunctions';
import BreadCrumbsSection from './BreadCrumbsSection';
import TopSection from './TopSection';

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
    round && round.usersWithScores ? sortValues<keyof UserWithScore, UserWithScore>('user')(round.usersWithScores) : [];

  return (
    <Box>
      <TopSection id={id} />

      {isLoading ? (
        <ProgressComponent />
      ) : round && round.usersWithScores && round.usersWithScores.length > 0 ? (
        <>
          <SubTitleComponent text={`RONDE ${id}`} />
          <DividerComponent />

          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} md={6} container justify="center">
              <ScoresBarChart scores={roundSortedByName} />
            </Grid>
          </Grid>
          <BreadCrumbsSection id={id} />
        </>
      ) : (
        <Message message={`Nog geen scores voor deze ronde`} />
      )}
    </Box>
  );
};

export default Round;
