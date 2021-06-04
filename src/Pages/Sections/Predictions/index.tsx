import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import { IFixtureWithScoreAndPredictions } from '../../../models/toto.models';
import { content } from '../../../ui/sharedClasses';
import MatchCard from '../Card/MatchCard';

const useStyles = makeStyles((theme: Theme) => ({
  ...content(theme),
}));

interface IProps {
  fixtures: IFixtureWithScoreAndPredictions[];
  display: 'private' | 'public';
}

const PredictionsSection: React.FC<IProps> = ({ fixtures, display }: IProps): ReactElement => {
  const classes = useStyles();

  return (
    <Grid item xs={12} container justify="center" className={classes.content}>
      {fixtures.map((wedstrijd, i) => (
        <Grid item key={i} lg={4} md={6} xs={12}>
          <MatchCard wedstrijdMetVoorspellingen={wedstrijd} display={display} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PredictionsSection;
