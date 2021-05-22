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
import { selectAppLoading } from '../../../store/appState/selectors';
import { fetchScoresTotoRound } from '../../../store/scores/actions';
import { selectTotoRound } from '../../../store/scores/selectors';
import { UserWithScore } from '../../../store/scores/types';
import { selectToken } from '../../../store/user/selectors';
import { topSection } from '../../../ui/sharedClasses';
import BreadCrumbsSection from './BreadCrumbsSection';

const useStyles = makeStyles((theme: Theme) => ({
  ...topSection(theme),
}));

const TotoRound: React.FC = (): ReactElement => {
  const classes = useStyles();
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

  const gotoTotoRound = () => history.push(`/voorspellingen/${id}/${+id * 3 - 2}`);

  return (
    <Box>
      <Grid container className={classes.topSection}>
        <PageTitleComponent text="Klassement" />
        <ButtonComponent caption="MIJN VOORSPELLINGEN" color="primary" handleClick={gotoTotoRound} />
      </Grid>

      {isLoading ? (
        <ProgressComponent />
      ) : totoRound && totoRound.usersWithScores && totoRound.usersWithScores.length > 0 ? (
        <>
          <SubTitleComponent text={`TOTO RONDE ${id}`} />
          <DividerComponent />

          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} md={6} container justify="center">
              <ScoresBarChart scores={totoRoundSortedByUserName} />
            </Grid>
          </Grid>
          <BreadCrumbsSection id={id} />
        </>
      ) : (
        <Message message={`Nog geen scores voor toto ronde ${id}`} />
      )}
    </Box>
  );
};

export default TotoRound;
