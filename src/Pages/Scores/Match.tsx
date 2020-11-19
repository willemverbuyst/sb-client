import React, { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Box, 
  Grid, 
  Typography 
} from '@material-ui/core';
import ScoresTable from '../../Components/Table/ScoresTable';
import { selectMatch } from '../../store/scores/selectors';
import { fetchScoresMatch } from '../../store/scores/actions';

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

  if (match) console.log(match.scores)

  return (
    token ? (  
      <Box>
        <Typography variant="h2" className={classes.title}>
          Match
        </Typography>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
        { match && match.scores ? <Grid><ScoresTable /></Grid> : <Typography>No Scores yet</Typography>} 
          
        </Grid>
      </Box>
    ) : ( null )
  )
}