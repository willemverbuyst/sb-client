import { Grid, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';

import { IFixtureWithScoreAndPredictions } from '../../models/toto.models';

type Props = { fixtureWithPrediction: IFixtureWithScoreAndPredictions };

const PublicPredictions: React.FC<Props> = ({ fixtureWithPrediction }: Props): ReactElement => {
  const {
    predictions: { pGoalsAwayTeam, pGoalsHomeTeam },
    status,
  } = fixtureWithPrediction;

  return (
    <Grid item xs={12} container justify="center">
      {(Number.isInteger(pGoalsHomeTeam) || Number.isInteger(pGoalsAwayTeam)) && status === 'Match Finished' ? (
        <Typography variant="overline" color="textSecondary">
          Voorspelling: {pGoalsHomeTeam} - {pGoalsAwayTeam}
        </Typography>
      ) : status === 'Match Finished' ? (
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
