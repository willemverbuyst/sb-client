import { Box, Grid } from '@material-ui/core';
import React, { ReactElement } from 'react';

import { IFixtureWithScoreAndPredictions } from '../../models/toto.models';
import MatchCard from '../Card/MatchCard';

interface IProps {
  fixtures: IFixtureWithScoreAndPredictions[];
  display: 'private' | 'public';
  userNamePlayer?: string;
}

const Predictions: React.FC<IProps> = ({ fixtures, display, userNamePlayer = '' }: IProps): ReactElement => {
  return (
    <Box my={{ sm: 1, md: 4 }}>
      <Grid item xs={12} container justify="center">
        {fixtures.map((wedstrijd, i) => (
          <Grid item key={i} lg={4} md={6} xs={12}>
            <MatchCard wedstrijdMetVoorspellingen={wedstrijd} display={display} userNamePlayer={userNamePlayer} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Predictions;
