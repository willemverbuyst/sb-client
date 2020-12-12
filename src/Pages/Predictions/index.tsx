import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFixtures } from '../../store/predictions/actions';
import { selectFixtures } from '../../store/predictions/selectors';
import { selectToken } from '../../store/user/selectors';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import MatchCard from '../../Components/Card/MatchCard';
import PaginationComponent from '../../Components/Pagination';
import Progress from '../../Components/Progress';

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

export default function Predictions() {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const history = useHistory();
  const dispatch = useDispatch();
  const fixtures = useSelector(selectFixtures)
  const [totoRoundNumber, setTotoRoundNumber] = React.useState(1);
  const [roundNumber, setRoundNumber] = React.useState(1);
  
  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    if (!fixtures) {
      dispatch(fetchAllFixtures());
    }
  }, [dispatch, fixtures]);

  const handleChangeTotoRounds = (_event: React.ChangeEvent<unknown>, value: number) => {
    setTotoRoundNumber(value);
    setRoundNumber(1);
  };

  const handleChangeRounds = (_event: React.ChangeEvent<unknown>, value:number) => {
    setRoundNumber(value);
  };

  return (
    <Grid container>
      <Grid container justify="space-between">
        <Grid>
          <Typography variant="h3" className={classes.title}>
            Voorspellingen
          </Typography>
        </Grid>
        { fixtures ?
          <Grid>
            <Button
              variant="contained" 
              size="small" 
              color="secondary" 
              disableElevation 
              onClick={()=> history.push(`/scores/totoronde/${totoRoundNumber}`)}
            >
              TOTORONDE: {totoRoundNumber}
            </Button>
          </Grid>
        :
          <Progress colorSpinner="secondary"/>  
        }
      </Grid>

      { fixtures ?
        <>
          <Grid item xs={12} container justify="center">
            { fixtures ? [...fixtures[totoRoundNumber -1][roundNumber -1]]
              .sort((f1, f2) => f1.eventTimeStamp - f2.eventTimeStamp)
              .map((wedstrijd, i) => <Grid item key={i} lg={4} md={6} xs={12}>
                <MatchCard wedstrijdMetVoorspellingen={wedstrijd}/></Grid>) 
            : null }
          </Grid>

          <PaginationComponent 
            label="Speelronde"
            number={roundNumber}
            numberFixtures={fixtures[totoRoundNumber -1].length} 
            color="primary" 
            onChange={handleChangeRounds}
          /> 
          <PaginationComponent 
            label="Totoronde"
            number={totoRoundNumber}
            numberFixtures={fixtures.length}
            color="secondary"
            onChange={handleChangeTotoRounds}
          /> 
        </>
      : null }
    </Grid>
  )
}

