import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentRound } from '../../store/voorspellingen/actions';
import { selectCurrentRound } from '../../store/voorspellingen/selectors';
import { selectToken } from '../../store/user/selectors';
import MatchCard from '../../Components/Card/MatchCard';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';

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
  const currentRound = useSelector(selectCurrentRound);

  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    if (!currentRound) {
      dispatch(fetchCurrentRound())
    }
  }, [dispatch, currentRound]);

  return (
      <Grid container>
        {currentRound ? 
        <>
          <Grid container justify="space-between">
            <Grid>
              <Typography variant="h3" className={classes.title}>
              Deze week
              </Typography>
            </Grid>
            <Grid>
              <Button
                variant="contained" 
                size="small" 
                color="secondary" 
                disableElevation 
                onClick={()=> history.push(`/scores/totoronde/${currentRound.totoRoundNumber}`)}
              >
                TOTORONDE: {currentRound.totoRoundNumber}
              </Button>
            </Grid>
          </Grid>
       
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.subTitle}>
              Speelronde: {currentRound.roundNumber}
            </Typography>
          </Grid>

          <Grid item xs={12} container justify="center">
            {currentRound.fixtures.map((wedstrijd, i) => <Grid item key={i} lg={4} md={6} xs={12}><MatchCard wedstrijdMetVoorspellingen={wedstrijd}/></Grid>)}
          </Grid>
        </>
        : null }
      </Grid>
  )
}
