import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import { ICurrentRound } from '../../models/toto.models';
import { content } from '../../ui/sharedClasses';
import MatchCard from '../Sections/Card/MatchCard';

const useStyles = makeStyles((theme: Theme) => ({
  ...content(theme),
}));

interface IProps {
  currentRound: ICurrentRound;
}

const FixturesSection: React.FC<IProps> = ({ currentRound }: IProps): ReactElement => {
  const classes = useStyles();

  return (
    <Grid item xs={12} container justify="center" className={classes.content}>
      {currentRound.fixtures.map((wedstrijd, i) => (
        <Grid item key={i} lg={4} md={6} xs={12}>
          <MatchCard wedstrijdMetVoorspellingen={wedstrijd} display="Home" />
        </Grid>
      ))}
    </Grid>
  );
};

export default FixturesSection;
