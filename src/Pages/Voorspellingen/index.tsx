import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import { fetchAllFixtures } from '../../store/voorspellingen/actions';
import { selectFixtures } from '../../store/voorspellingen/selectors';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import MatchCard from '../../Components/Card/MatchCard';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.main
  },
  subTitle: {
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main
  },
  pagination: {
    padding: theme.spacing(2)
  }
}));

export default function Voorspellingen() {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const history = useHistory();
  const dispatch = useDispatch();
  const fixtures = useSelector(selectFixtures)
  const [gameNumber, setGameNumber] = React.useState(1);
  const [roundNumber, setRoundNumber] = React.useState(1);
  
  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    dispatch(fetchAllFixtures());
  }, [dispatch, fixtures]);

  const handleChangeGames = (_event: React.ChangeEvent<unknown>, value: number) => {
    setGameNumber(value);
  };

  const handleChangeRounds = (_event: React.ChangeEvent<unknown>, value: number) => {
    setRoundNumber(value);
  };

  return (
    token ? (  
      <Grid container>
        <Typography variant="h3" className={classes.title}>
          Voorspellingen
        </Typography>

      { fixtures ?
        <>
          <Grid item xs={12} container justify="center">
          {fixtures ? [...fixtures[gameNumber -1][roundNumber -1]]
            .sort((f1, f2) => f1.eventTimeStamp - f2.eventTimeStamp)
            .map((wedstrijd, i) => <Grid item key={i} lg={4} md={6} xs={12}>
              <MatchCard wedstrijdMetVoorspellingen={wedstrijd}/></Grid>) 
            : null }
          </Grid>

          <Grid item xs={12}>
            <Grid container justify="center">
              <Typography variant="overline" gutterBottom>
                Rounds
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Pagination count={fixtures[gameNumber -1].length} color="primary" onChange={handleChangeRounds} />
            </Grid>
          </Grid>
            
          <Grid item xs={12}>
            <Grid container justify="center">
              <Typography variant="overline" gutterBottom>
                Games
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Pagination count={fixtures.length} color="secondary" onChange={handleChangeGames} />
            </Grid>
          </Grid>   
        </>
      : null }
      </Grid>
    ) : ( null )
  )
}

