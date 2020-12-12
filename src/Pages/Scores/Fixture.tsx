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
import ScoresTable from '../../Components/Table/ScoresTable';
import { selectFixture } from '../../store/scores/selectors';
import { fetchScoresFixture } from '../../store/scores/actions';
import { timeStampFormattedToLocalDate } from '../../utils/timeFunctions';

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
  table: {
    marginTop: theme.spacing(6),
  },
}));

export default function Fixture() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { id } = useParams<{ id: string }>();
  const fixture = useSelector(selectFixture);

  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    dispatch(fetchScoresFixture(+id))
  }, [dispatch, id])

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
            TERUG NAAR VOORSPELLINGEN
          </Button>
        </Grid>
      </Grid>

      {fixture ? 
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
      : null }

      <Divider/>

      { fixture && fixture.scores ?
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.table}
        >
          <Grid item xs={12} md={6} container justify="center">
            <ScoresTable scores={fixture.scores}/>
            </Grid>
        </Grid>
      : null }
    </Box>
  )
}