import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { IFixtureWithScoreAndPredictions } from '../../models/toto.models';

type Prop = { fixtureWithPrediction: IFixtureWithScoreAndPredictions }

export default function PublicPredictions({fixtureWithPrediction} : Prop ) {

  return (
    <Grid item xs={12} container justify="center">
      {(fixtureWithPrediction.predictions.pGoalsHomeTeam || fixtureWithPrediction.predictions.pGoalsAwayTeam) && 
        fixtureWithPrediction.status === 'Match Finished' ?
            <Typography variant="overline" color="textSecondary">
              Voorspelling: {fixtureWithPrediction.predictions.pGoalsHomeTeam} - {fixtureWithPrediction.predictions.pGoalsAwayTeam}
            </Typography>
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
