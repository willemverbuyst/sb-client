import React, { ReactElement } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { IFixtureWithScoreAndPredictions } from '../../models/toto.models';

type Props = { fixtureWithPrediction: IFixtureWithScoreAndPredictions };

const PredictionsHome: React.FC<Props> = ({ fixtureWithPrediction }: Props): ReactElement => {
  const {
    predictions: { pGoalsAwayTeam, pGoalsHomeTeam },
    status,
  } = fixtureWithPrediction;

  return (
    <Grid item xs={12} container justify="center">
      {(Number.isInteger(pGoalsHomeTeam) || Number.isInteger(pGoalsAwayTeam)) && status === 'Match Finished' ? (
        <Grid container justify="space-around">
          <Typography variant="overline" color="textSecondary">
            Voorspelling: {pGoalsHomeTeam} - {pGoalsAwayTeam}
          </Typography>
        </Grid>
      ) : Number.isInteger(pGoalsHomeTeam) || Number.isInteger(pGoalsAwayTeam) ? (
        <Grid container justify="space-around">
          <Typography variant="overline" color="secondary">
            Voorspelling: {pGoalsHomeTeam} - {pGoalsAwayTeam}
          </Typography>
        </Grid>
      ) : (
        <Typography variant="overline" color="textSecondary">
          Geen voorspelling
        </Typography>
      )}
    </Grid>
  );
};

export default PredictionsHome;
