import React, { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Avatar,
  Box,
  Button, 
  Divider,
  Grid, 
  Typography 
} from '@material-ui/core';
import { selectFixture } from '../../store/scores/selectors';
import { fetchScoresFixture } from '../../store/scores/actions';
import { timeStampFormattedToLocalDate } from '../../utils/timeFunctions';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import { selectAppLoading } from '../../store/appState/selectors';
import ScoresFixtureBarChart from '../../Components/Chart/ScoresFixtureBarChart';
import { PredictionWithScorePerUser } from '../../store/scores/types';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.main
  },
  fixture: {
    marginBottom: theme.spacing(6),
  },
  date: {
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginBottom: theme.spacing(6),
  },
  progress: {
    minHeight: '70vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

export default function Fixture() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { id } = useParams<{ id: string }>();
  const fixture = useSelector(selectFixture);
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    dispatch(fetchScoresFixture(+id))
  }, [dispatch, id])


  const scoresSortedByName: PredictionWithScorePerUser[] = fixture && fixture.scores ? [...fixture.scores]
    .sort((name1, name2) => name1.user.toLowerCase().localeCompare(name2.user.toLowerCase())) : []

  return (
    <Box>
      <Grid container justify="space-between">
        <Grid>
          <Typography variant="h3" className={classes.title}>
          Scores
          </Typography>
        </Grid>
        <Grid>
          <Button
            variant="contained" 
            size="small" 
            color="secondary" 
            disableElevation 
            onClick={()=> history.goBack()}
          >
            TERUG
          </Button>
        </Grid>
      </Grid>

      {isLoading ? 
        <Box className={classes.progress}>
          <ProgressLinear/> 
        </Box>
      :
      fixture ? 
        <>
          <Grid className={classes.fixture}>       
            <Grid item xs={12} container justify="center" className={classes.date}>
              <Typography variant="overline">
                 {timeStampFormattedToLocalDate(fixture.fixture.eventTimeStamp)}
              </Typography>
            </Grid> 
            <Grid item xs={12} container justify="center">
              <Grid item xs={3} container justify="flex-end" alignItems="center">
                <Typography variant="h4">
                   {fixture.fixture.homeTeamName}
                </Typography>
              </Grid>

              <Grid item xs={1} container justify="center">
                <Avatar alt={fixture.fixture.homeTeamName} src={fixture.fixture.homeTeamLogo} />
              </Grid>
              <Grid item xs={1} container justify="center">
                <Typography variant="h4">
                  {fixture.fixture.goalsHomeTeam} - {fixture.fixture.goalsAwayTeam}
                </Typography>
              </Grid>
              <Grid item xs={1} container justify="center">
                <Avatar alt={fixture.fixture.awayTeamName} src={fixture.fixture.awayTeamLogo} />
              </Grid>

              <Grid item xs={3} container justify="flex-start" alignItems="center">
                <Typography variant="h4">
                  {fixture.fixture.awayTeamName}
                </Typography>
              </Grid>
            </Grid> 
          </Grid>

          <Divider className={classes.divider}/>
        </>
      : null }

      { !isLoading && fixture && fixture.scores ?
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} md={6} container justify="center">
            <ScoresFixtureBarChart scores={scoresSortedByName}/>
          </Grid>
        </Grid>
      : !isLoading && fixture && !fixture.scores ?
        <Grid container justify="center">
          <Typography variant="overline">
            Geen scores
          </Typography>
        </Grid> 
      : null }
    </Box>
  )
}