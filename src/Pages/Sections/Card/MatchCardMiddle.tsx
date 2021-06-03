import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import LogoSmallComponent from '../../../Components/Logo/LogoSmall';
import { IFixtureWithScoreAndPredictions } from '../../../models/toto.models';
import { getOutCome } from './card-functions';

const useStyles = makeStyles(() => ({
  match: {
    cursor: 'pointer',
    height: 60,
  },
}));

interface IProps {
  fixtureWithPrediction: IFixtureWithScoreAndPredictions;
}

const MatchCardMiddle: React.FC<IProps> = ({ fixtureWithPrediction }: IProps): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const {
    awayTeamLogo,
    awayTeamName,
    eventTimeStamp,
    goalsAwayTeam,
    goalsHomeTeam,
    homeTeamName,
    homeTeamLogo,
    id,
    status,
  } = fixtureWithPrediction;

  return (
    <Grid
      item
      xs={12}
      className={classes.match}
      container
      justify="center"
      alignItems="center"
      onClick={() => history.push(`/wedstrijd/${id}`)}
    >
      <Grid item xs={4} container justify="flex-end" alignItems="center">
        <Typography style={{ textAlign: 'right' }}>{homeTeamName}</Typography>
      </Grid>

      <LogoSmallComponent alt={homeTeamName} source={homeTeamLogo} />

      <Grid item xs={2} container justify="center" alignItems="center">
        <Typography>{getOutCome(status, goalsHomeTeam, goalsAwayTeam, eventTimeStamp)}</Typography>
      </Grid>

      <LogoSmallComponent alt={awayTeamName} source={awayTeamLogo} />

      <Grid item xs={4} container justify="flex-start" alignItems="center">
        <Typography>{awayTeamName}</Typography>
      </Grid>
    </Grid>
  );
};

export default MatchCardMiddle;
