import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import MatchCard from '../../Components/Card/MatchCard';
import { IFixtureWithScoreAndPredictions } from '../../models/toto.models';
import { content } from '../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...content(theme),
}));

interface IProps {
  fixtures: IFixtureWithScoreAndPredictions[];
}

const FixturesSection: React.FC<IProps> = ({ fixtures }: IProps): ReactElement => {
  const classes = useStyles();

  return (
    <Grid item xs={12} container justify="center" className={classes.content}>
      {fixtures.map((wedstrijd, i) => (
        <Grid item key={i} lg={4} md={6} xs={12}>
          <MatchCard wedstrijdMetVoorspellingen={wedstrijd} display="Predictions" />
        </Grid>
      ))}
    </Grid>
  );
};

export default FixturesSection;
