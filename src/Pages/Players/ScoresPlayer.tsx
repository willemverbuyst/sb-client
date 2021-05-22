import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import ButtonComponent from '../../Components/Button';
import ScoresStackedChart from '../../Components/Chart/ScoresStackedChart';
import DividerComponent from '../../Components/Divider';
import Message from '../../Components/Message';
import ProgressComponent from '../../Components/Progress';
import PageTitleComponent from '../../Components/Title/PageTitle';
import SubTitleComponent from '../../Components/Title/SubTitle';
import { selectAppLoading } from '../../store/appState/selectors';
import { fetchPlayerScores } from '../../store/players/actions';
import { selectPlayerScores } from '../../store/players/selectors';
import { selectToken } from '../../store/user/selectors';
import { topSection, waitMessage } from '../../ui/sharedClasses';
import { colorPrimary, colorSecondary } from '../../ui/theme/chartColors';

const useStyles = makeStyles((theme: Theme) => ({
  ...topSection(theme),
  ...waitMessage(theme),
}));

const ScoresPlayer: React.FC = (): ReactElement => {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const scoresPlayer = useSelector(selectPlayerScores);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    dispatch(fetchPlayerScores(+id));
  }, [dispatch, id]);

  const gotoPredictions = () => history.push(`/spelers/${id}/voorspellingen/1/1`);

  return isLoading ? (
    <Box>
      <Grid container className={classes.topSection}>
        <Grid>
          <Typography variant="h3" className={classes.waitMessage}>
            Wacht op scores
          </Typography>
        </Grid>
      </Grid>
      <ProgressComponent />
    </Box>
  ) : scoresPlayer ? (
    <Box>
      <Grid container className={classes.topSection}>
        <PageTitleComponent text={scoresPlayer.userName} />
        <ButtonComponent caption="VOORSPELLINGEN" color="secondary" handleClick={gotoPredictions} />
      </Grid>

      {scoresPlayer ? (
        <>
          <SubTitleComponent text="TOTO RONDES" />
          <DividerComponent />

          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} md={6} container justify="center">
              <ScoresStackedChart
                scoresPlayer={scoresPlayer}
                colorMain={colorSecondary}
                colorHover={colorPrimary}
                loggedInUser={false}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <Message message={`Nog geen scores`} />
      )}
    </Box>
  ) : (
    <></>
  );
};

export default ScoresPlayer;
