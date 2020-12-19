import React from 'react';
import { Chip, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { IFixtureWithScoreAndPredictions } from '../../models/toto.models';

const useStyles = makeStyles({
  chip: {
    marginLeft: 2,
  }
})

type Prop = { fixtureWithPrediction: IFixtureWithScoreAndPredictions }

export default function PublicPredictions({fixtureWithPrediction} : Prop ) {
  const classes = useStyles()

  return (
    <Grid item xs={12} container justify="center">
      {(fixtureWithPrediction.predictions.pGoalsHomeTeam || fixtureWithPrediction.predictions.pGoalsAwayTeam) && 
        fixtureWithPrediction.status === 'Match Finished' ?
          <Grid container justify="space-around">
            <Typography variant="overline" color="textSecondary">
              Voorspelling: {fixtureWithPrediction.predictions.pGoalsHomeTeam} - {fixtureWithPrediction.predictions.pGoalsAwayTeam}
            </Typography>
            <Chip 
              label={`SCORE ${fixtureWithPrediction.score}`} 
              variant="outlined"
              color="secondary"
              className={classes.chip}
            />
          </Grid>
      : fixtureWithPrediction.status === 'Match Finished' ?
          <Typography variant="overline" color="textSecondary">
            Geen voorspelling
          </Typography>
      : 
        <Typography variant="overline" color="textSecondary">
          Wedstrijd nog niet gespeeld.
        </Typography>
      }
    </Grid>
  )
}
