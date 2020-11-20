import React, { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Avatar,
  Box, 
  Grid, 
  Typography 
} from '@material-ui/core';
import ScoresTable from '../../Components/Table/ScoresTable';
import { selectMatch } from '../../store/scores/selectors';
import { fetchScoresMatch } from '../../store/scores/actions';
import { timeStampFormattedToLocalDate } from '../../utils/timeFunctions';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.main
  }
}));

export default function Matches() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { id } = useParams<{ id: string }>();
  const match = useSelector(selectMatch);

  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    dispatch(fetchScoresMatch(+id))
  }, [dispatch, id])

  return (
    token ? (  
      <Box>
        <Typography variant="h2" className={classes.title}>
          Match
        </Typography>
     
        {match ? 
        <>       
          <Grid item xs={12} container justify="center">
            <Typography variant="overline">
               {timeStampFormattedToLocalDate(match.fixture.eventTimeStamp)}
            </Typography>
          </Grid> 
          <Grid item xs={12} container justify="center">
            <Grid item xs={3} container justify="flex-end" alignItems="center">
              <Typography variant="h4">
                 {match.fixture.homeTeamName}
              </Typography>
            </Grid>

            <Grid item xs={1} container justify="center">
              <Avatar alt={match.fixture.homeTeamName} src={match.fixture.homeTeamLogo} />
            </Grid>
            <Grid item xs={1} container justify="center">
              <Typography variant="h4">
                {match.fixture.goalsHomeTeam} - {match.fixture.goalsAwayTeam}
              </Typography>
            </Grid>
            <Grid item xs={1} container justify="center">
              <Avatar alt={match.fixture.awayTeamName} src={match.fixture.awayTeamLogo} />
            </Grid>

            <Grid item xs={3} container justify="flex-start" alignItems="center">
              <Typography variant="h4">
                {match.fixture.awayTeamName}
              </Typography>
            </Grid>
          </Grid> 
        </> 
        : null }
        { match && match.scores ?
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid><ScoresTable scores={match.scores}/></Grid>
        </Grid>
        : null }
       
      </Box>
    ) : ( null )
  )
}