import { Box, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import ButtonComponent from '../../../Components/Button';
import ScoresBarChart from '../../../Components/Chart/ScoresBarChart';
import DividerComponent from '../../../Components/Divider';
import Message from '../../../Components/Message';
import ProgressComponent from '../../../Components/Progress';
import PageTitleComponent from '../../../Components/Title/PageTitle';
import SubTitleComponent from '../../../Components/Title/SubTitle';
import { TOTAL_ROUNDS } from '../../../constants/setupGame';
import { selectAppLoading } from '../../../store/appState/selectors';
import { fetchScoresRound } from '../../../store/scores/actions';
import { selectRound } from '../../../store/scores/selectors';
import { UserWithScore } from '../../../store/scores/types';
import { selectToken } from '../../../store/user/selectors';
import { topSection } from '../../../ui/sharedClasses';
import { sortValues } from '../../../utils/sortFunctions';
import BreadCrumbsSection from './BreadCrumbsSection';

const useStyles = makeStyles((theme: Theme) => ({
  ...topSection(theme),
}));

const Round: React.FC = (): ReactElement => {
  const classes = useStyles();
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

  const gotoPredictions = () => {
    const t = +id !== TOTAL_ROUNDS ? Math.floor((+id - 1) / 3) + 1 : Math.floor((+id - 2) / 3) + 1;

    history.push(`/voorspellingen/${t}/${+id}`);
  };

  return (
    <Box>
      <Grid container className={classes.topSection}>
        <PageTitleComponent text="Klassement" />
        <ButtonComponent caption="MIJN VOORSPELLINGEN" color="primary" handleClick={gotoPredictions} />
      </Grid>

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
        </>
      ) : (
        <Message message={`Nog geen scores voor deze ronde`} />
      )}
      <BreadCrumbsSection id={id} />
    </Box>
  );
};

export default Round;
