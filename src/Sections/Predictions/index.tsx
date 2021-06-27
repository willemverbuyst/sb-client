import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import { IFixtureWithScoreAndPredictions } from '../../models/toto.models';
import MatchCard from '../Card/MatchCard';

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

interface IProps {
  fixtures: IFixtureWithScoreAndPredictions[];
  display: 'private' | 'public';
  userNamePlayer?: string;
}

const Predictions: React.FC<IProps> = ({ fixtures, display, userNamePlayer = '' }: IProps): ReactElement => {
  const classes = useStyles();

  return (
    <Grid item xs={12} container justify="center" className={classes.content}>
      {fixtures.map((wedstrijd, i) => (
        <Grid item key={i} lg={4} md={6} xs={12}>
          <MatchCard wedstrijdMetVoorspellingen={wedstrijd} display={display} userNamePlayer={userNamePlayer} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Predictions;
