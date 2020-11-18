import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
// import TopThreeTable from '../../Components/Table/TopThreeTable';
import MatchCard from '../../Components/PlayerCard/MatchCard';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { fetchCurrentRound } from '../../store/voorspellingen/actions';
import { selectCurrentRound } from '../../store/voorspellingen/selectors';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.main,
  },
  subTitle: {
    // fontWeight: 'bold',
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

  // console.log(round)

  return (
    token ? (  
      <Grid container>
       
        <Grid item xs={12}>
          <Typography variant="h2" className={classes.title}>
            Home
          </Typography>
        </Grid>
     
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.subTitle}>
            Programma deze week
          </Typography>
        </Grid>

        <Grid item xs={12} container justify="center">
          {round ? round.map((wedstrijd, i) => <Grid item key={i} lg={4} md={6} xs={12}><MatchCard wedstrijdMetVoorspellingen={wedstrijd}/></Grid>) : null }
        </Grid>

        {/* <Grid xs={12}>
          <Typography variant="h5" className={classes.subTitle}>
            Top Scores
          </Typography>
        </Grid>
       
        <Grid container justify="space-around" xs={12}>
          <Grid item md={3} xs={12}>
            <TopThreeTable /> 
          </Grid>
          <Grid  item md={3} xs={12}>
            <TopThreeTable /> 
          </Grid>
        </Grid> */}
      </Grid>
    ) : ( null )
  )
}
