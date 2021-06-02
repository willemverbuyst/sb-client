import { Grid } from '@material-ui/core';
import React, { ReactElement } from 'react';

import { IFixtureWithScoreAndPredictions } from '../../../models/toto.models';
import PredictionsField from './PredictionsField';
import PublicPredictions from './PublicPredictions';

interface IProps {
  fixtureWithPrediction: IFixtureWithScoreAndPredictions;
  display: string;
}

const MatchCardBottom: React.FC<IProps> = ({ fixtureWithPrediction, display }: IProps): ReactElement => {
  return (
    <Grid item xs={12} container justify="center">
      {display === 'public' ? (
        <PublicPredictions fixtureWithPrediction={fixtureWithPrediction} />
      ) : (
        <>
          <PredictionsField fixtureWithPrediction={fixtureWithPrediction} />
        </>
      )}
    </Grid>
  );
};

export default MatchCardBottom;
