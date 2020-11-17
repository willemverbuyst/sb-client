import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import TopThreeTable from '../../Components/Table/TopThreeTable';
import MatchCard from '../../Components/PlayerCard/MatchCard';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Box, 
  Grid, 
  Typography 
} from '@material-ui/core';
import { fetchCurrentRound } from '../../store/voorspellingen/actions';
import { selectCurrentRound } from '../../store/voorspellingen/selectors';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.main
  }
}));

export default function HomePage() {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const history = useHistory();
  const dispatch = useDispatch();
  const round = useSelector(selectCurrentRound);

  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    dispatch(fetchCurrentRound())
  });

  console.log(round)

  return (
    token ? (  
      <Box>
        <Typography variant="h2" className={classes.title}>
          Home
        </Typography>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid><TopThreeTable /></Grid>
          <Grid><TopThreeTable /></Grid>
        </Grid>
        {round ? round.map((wedstrijd, i) => <MatchCard key ={i} wedstrijdMetVoorspellingen={wedstrijd}/>) : null }
      </Box>
    ) : ( null )
  )
}
