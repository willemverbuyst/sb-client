import React, { ReactElement } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { IFixtureWithScoreAndPredictions } from '../../models/toto.models';

type Props = { fixtureWithPrediction: IFixtureWithScoreAndPredictions };

const PublicPredictions: React.FC<Props> = ({ fixtureWithPrediction }: Props): ReactElement => {
  return (
    <Grid item xs={12} container justify="center">
      {(fixtureWithPrediction.predictions.pGoalsHomeTeam || fixtureWithPrediction.predictions.pGoalsAwayTeam) &&
      fixtureWithPrediction.status === 'Match Finished' ? (
        <Typography variant="overline" color="textSecondary">
          Voorspelling: {fixtureWithPrediction.predictions.pGoalsHomeTeam} -{' '}
          {fixtureWithPrediction.predictions.pGoalsAwayTeam}
        </Typography>
      ) : fixtureWithPrediction.status === 'Match Finished' ? (
        <Typography variant="overline" color="textSecondary">
          Geen voorspelling
        </Typography>
      ) : (
        <Typography variant="overline" color="textSecondary">
          Wedstrijd nog niet gespeeld.
        </Typography>
      )}
    </Grid>
  );
};

export default PublicPredictions;
