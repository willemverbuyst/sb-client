import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { IFixtureWithScoreAndPredictions } from '../../models/toto.models';

type Prop = { fixtureWithPrediction: IFixtureWithScoreAndPredictions };

export default function PredictionsHome({ fixtureWithPrediction }: Prop) {
  return (
    <Grid item xs={12} container justify="center">
      {(fixtureWithPrediction.predictions.pGoalsHomeTeam || fixtureWithPrediction.predictions.pGoalsAwayTeam) &&
      fixtureWithPrediction.status === 'Match Finished' ? (
        <Grid container justify="space-around">
          <Typography variant="overline" color="textSecondary">
            Voorspelling: {fixtureWithPrediction.predictions.pGoalsHomeTeam} -{' '}
            {fixtureWithPrediction.predictions.pGoalsAwayTeam}
          </Typography>
        </Grid>
      ) : fixtureWithPrediction.predictions.pGoalsHomeTeam || fixtureWithPrediction.predictions.pGoalsAwayTeam ? (
        <Grid container justify="space-around">
          <Typography variant="overline" color="secondary">
            Voorspelling: {fixtureWithPrediction.predictions.pGoalsHomeTeam} -{' '}
            {fixtureWithPrediction.predictions.pGoalsAwayTeam}
          </Typography>
        </Grid>
      ) : (
        <Typography variant="overline" color="textSecondary">
          Geen voorspelling
        </Typography>
      )}
    </Grid>
  );
}
