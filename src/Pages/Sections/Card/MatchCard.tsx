import { Card, CardContent, Grid, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import ChipComponent from '../../../Components/Card/Chip';
import LogoSmallComponent from '../../../Components/Logo/LogoSmall';
import { IFixtureWithScoreAndPredictions } from '../../../models/toto.models';
import { getOutCome } from './card-functions';
import MatchCardBottom from './MatchCardBottom';
import MatchCardTop from './MatchCardTop';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    [theme.breakpoints.down('xs')]: {
      margin: '10px -5px',
    },
    textAlign: 'center',
    margin: '10px',
    position: 'relative',
  },
  logo: {
    height: 20,
    width: 20,
    objectFit: 'contain',
  },
  match: {
    cursor: 'pointer',
    height: 60,
  },
}));

interface IProps {
  wedstrijdMetVoorspellingen: IFixtureWithScoreAndPredictions;
  display: 'private' | 'public';
}

const MatchCard: React.FC<IProps> = ({ wedstrijdMetVoorspellingen, display }: IProps): ReactElement => {
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
    score,
    status,
  } = wedstrijdMetVoorspellingen;

  const renderScoreChip = (): ReactElement | null =>
    status === 'Match Finished' ? <ChipComponent score={score} /> : null;

  return (
    <Card className={classes.card}>
      <CardContent>
        {renderScoreChip()}

        <MatchCardTop eventTimeStamp={eventTimeStamp} />

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

        <MatchCardBottom fixtureWithPrediction={wedstrijdMetVoorspellingen} display={display} />
      </CardContent>
    </Card>
  );
};

export default MatchCard;
