import { Avatar, Box, Button, Divider, Grid, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import ScoresFixtureBarChart from '../../Components/Chart/ScoresFixtureBarChart';
import Message from '../../Components/Message';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import PageTitle from '../../Components/Title/PageTitle';
import { selectAppLoading } from '../../store/appState/selectors';
import { fetchScoresFixture } from '../../store/scores/actions';
import { selectFixture } from '../../store/scores/selectors';
import { PredictionWithScorePerUser } from '../../store/scores/types';
import { selectToken } from '../../store/user/selectors';
import { divider, progress, topSection } from '../../ui/sharedClasses';
import { sortValues } from '../../utils/sortFunctions';
import { timeStampFormattedToLocalDate } from '../../utils/timeFunctions';

const useStyles = makeStyles((theme: Theme) => ({
  ...divider(theme),
  ...progress(),
  ...topSection(theme),
  fixture: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(0),
    },
    marginBottom: theme.spacing(6),
  },
  date: {
    marginBottom: theme.spacing(2),
  },
  text: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      margin: '0.5rem',
    },
  },
  avatar: {
    [theme.breakpoints.down('xs')]: {
      transform: 'scale(0.8)',
    },
  },
}));

const Fixture: React.FC = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { id } = useParams<{ id: string }>();
  const fixture = useSelector(selectFixture);
  const isLoading = useSelector(selectAppLoading);
  const theme = useTheme();
  const btnVariant = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    dispatch(fetchScoresFixture(+id));
  }, [dispatch, id]);

  const scoresSortedByName: PredictionWithScorePerUser[] =
    fixture && fixture.scores
      ? sortValues<keyof PredictionWithScorePerUser, PredictionWithScorePerUser>('user')(fixture.scores)
      : [];

  return (
    <Box>
      <Grid container className={classes.topSection}>
        <PageTitle text="Uitslag" />
        <Grid>
          <Button
            variant={btnVariant ? 'contained' : 'outlined'}
            size="small"
            color="primary"
            disableElevation
            onClick={() => history.goBack()}
          >
            TERUG
          </Button>
        </Grid>
      </Grid>

      {isLoading ? (
        <Box className={classes.progress}>
          <ProgressLinear />
        </Box>
      ) : fixture ? (
        <>
          <Grid className={classes.fixture}>
            <Grid item xs={12} container justify="center" className={classes.date}>
              <Typography variant="overline">
                {timeStampFormattedToLocalDate(fixture.fixture.eventTimeStamp)}
              </Typography>
            </Grid>
            <Grid item xs={12} container justify="center">
              <Grid item xs={3} container justify="flex-end" alignItems="center">
                <Typography variant="h4" className={classes.text} style={{ textAlign: 'right' }}>
                  {fixture.fixture.homeTeamName}
                </Typography>
              </Grid>

              <Grid item xs={1} container justify="center" alignItems="center">
                <Avatar
                  alt={fixture.fixture.homeTeamName}
                  src={fixture.fixture.homeTeamLogo}
                  className={classes.avatar}
                />
              </Grid>
              <Grid item xs={2} sm={1} container justify="center" alignItems="center">
                <Typography variant="h4" className={classes.text}>
                  {fixture.fixture.goalsHomeTeam} - {fixture.fixture.goalsAwayTeam}
                </Typography>
              </Grid>
              <Grid item xs={1} container justify="center" alignItems="center">
                <Avatar
                  alt={fixture.fixture.awayTeamName}
                  src={fixture.fixture.awayTeamLogo}
                  className={classes.avatar}
                />
              </Grid>

              <Grid item xs={3} container justify="flex-start" alignItems="center">
                <Typography variant="h4" className={classes.text}>
                  {fixture.fixture.awayTeamName}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Divider className={classes.divider} />
        </>
      ) : null}

      {!isLoading && fixture && fixture.scores ? (
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} md={6} container justify="center">
            <ScoresFixtureBarChart scores={scoresSortedByName} />
          </Grid>
        </Grid>
      ) : !isLoading && fixture && !fixture.scores ? (
        <Message message={`Geen scores`} />
      ) : null}
    </Box>
  );
};

export default Fixture;
