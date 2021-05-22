import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import MatchCard from '../../Components/Card/MatchCard';
import { TotoRound } from '../../models/toto.models';
import { content } from '../../ui/sharedClasses';
import { calculateIndex } from '../../utils/parameterFunctions';

const useStyles = makeStyles((theme: Theme) => ({
  ...content(theme),
}));

interface IProps {
  fixtures: TotoRound[];
  totoronde: string;
  ronde: string;
}

const FixturesSection: React.FC<IProps> = ({ fixtures, totoronde, ronde }: IProps): ReactElement => {
  const classes = useStyles();
  const t = Number(totoronde);
  const r = Number(ronde);

  return (
    <Grid item xs={12} container justify="center" className={classes.content}>
      {fixtures
        ? [...fixtures[t - 1][calculateIndex(r)]]
            .sort((f1, f2) => f1.eventTimeStamp - f2.eventTimeStamp)
            .map((wedstrijd, i) => (
              <Grid item key={i} lg={4} md={6} xs={12}>
                <MatchCard wedstrijdMetVoorspellingen={wedstrijd} display="Predictions" />
              </Grid>
            ))
        : null}
    </Grid>
  );
};

export default FixturesSection;
