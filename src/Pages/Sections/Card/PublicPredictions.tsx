import { Grid, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';

import { IFixtureWithScoreAndPredictions } from '../../../models/toto.models';
import { getPublicPrediction } from './prediction-functions';

type Props = { fixtureWithPrediction: IFixtureWithScoreAndPredictions };

const PublicPredictions: React.FC<Props> = ({ fixtureWithPrediction }: Props): ReactElement => {
  const {
    predictions: { pGoalsAwayTeam, pGoalsHomeTeam },
    status,
  } = fixtureWithPrediction;

  return (
    <Grid item xs={12} container justify="center">
      <Typography variant="overline" color="textSecondary">
        {getPublicPrediction(pGoalsHomeTeam, pGoalsAwayTeam, status)}
      </Typography>
    </Grid>
  );
};

export default PublicPredictions;
