import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentRound } from '../../store/voorspellingen/actions';
import { selectCurrentRound } from '../../store/voorspellingen/selectors';
import { selectToken } from '../../store/user/selectors';
import MatchCard from '../../Components/Card/MatchCard';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.main,
  },
  subTitle: {
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main
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

  return (
    token ? (  
      <Grid container>
       
        <Grid item xs={12}>
          <Typography variant="h3" className={classes.title}>
          Deze week
          </Typography>
        </Grid>
     
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.subTitle}>
            Speelronde: x TotorondeL y
          </Typography>
        </Grid>

        <Grid item xs={12} container justify="center">
          {round ? round.map((wedstrijd, i) => <Grid item key={i} lg={4} md={6} xs={12}><MatchCard wedstrijdMetVoorspellingen={wedstrijd}/></Grid>) : null }
        </Grid>

      </Grid>
    ) : ( null )
  )
}
