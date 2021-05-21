import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import ButtonComponent from '../../Components/Button';
import MatchCard from '../../Components/Card/MatchCard';
import PaginationComponent from '../../Components/Pagination';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import PageTitleComponent from '../../Components/Title/PageTitle';
import { selectAppLoading } from '../../store/appState/selectors';
import { fetchPlayerProfile } from '../../store/players/actions';
import { selectPlayerProfile } from '../../store/players/selectors';
import { selectToken } from '../../store/user/selectors';
import { content, pagination, progress, topSection, waitMessage } from '../../ui/sharedClasses';
import { calculateIndex, roundByTotoRound, totoRoundByRound } from '../../utils/parameterFunctions';

const useStyles = makeStyles((theme: Theme) => ({
  ...content(theme),
  ...pagination(theme),
  ...progress(),
  ...topSection(theme),
  ...waitMessage(theme),
}));

const PredictionsPlayer: React.FC = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const playerProfile = useSelector(selectPlayerProfile);
  const isLoading = useSelector(selectAppLoading);
  const { totoronde } = useParams<{ totoronde: string }>();
  const { ronde } = useParams<{ ronde: string }>();
  let t = +totoronde;
  let r = +ronde;

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    dispatch(fetchPlayerProfile(+id));
  }, [dispatch, id]);

  const gotoScores = () => history.push(`/spelers/${id}/scores`);

  const handleChangeTotoRounds = (_event: React.ChangeEvent<unknown>, value: number) => {
    r = roundByTotoRound(value);
    history.push(`/spelers/${id}/voorspellingen/${value}/${r}`);
  };

  const handleChangeRounds = (_event: React.ChangeEvent<unknown>, value: number) => {
    t = totoRoundByRound(value);

    history.push(`/spelers/${id}/voorspellingen/${t}/${value}`);
  };

  return isLoading ? (
    <Box>
      <Grid container className={classes.topSection}>
        <Grid>
          <Typography variant="h3" className={classes.waitMessage}>
            Wacht op voorspellingen
          </Typography>
        </Grid>
      </Grid>
      <Box className={classes.progress}>
        <ProgressLinear />
      </Box>
    </Box>
  ) : playerProfile ? (
    <Box>
      <Grid container className={classes.topSection}>
        <PageTitleComponent text={playerProfile.userName} />
        <ButtonComponent caption="SCORES" color="secondary" handleClick={gotoScores} />
      </Grid>

      {playerProfile && playerProfile.pastFixturesWithScores ? (
        <>
          <Grid item xs={12} container justify="center" className={classes.content}>
            {playerProfile.pastFixturesWithScores
              ? [...playerProfile.pastFixturesWithScores[t - 1][calculateIndex(r)]]
                  .sort((f1, f2) => f1.eventTimeStamp - f2.eventTimeStamp)
                  .map((wedstrijd, i) => (
                    <Grid item key={i} lg={4} md={6} xs={12}>
                      <MatchCard wedstrijdMetVoorspellingen={wedstrijd} display="public" />
                    </Grid>
                  ))
              : null}
          </Grid>
          <Grid className={classes.pagination}>
            <PaginationComponent
              label="Totoronde"
              page={t}
              count={playerProfile.pastFixturesWithScores.length}
              color="primary"
              onChange={handleChangeTotoRounds}
            />
            <PaginationComponent
              label="Speelronde"
              page={r}
              count={playerProfile.pastFixturesWithScores.flat().length}
              color="secondary"
              onChange={handleChangeRounds}
            />
          </Grid>
        </>
      ) : null}
    </Box>
  ) : (
    <></>
  );
};

export default PredictionsPlayer;
