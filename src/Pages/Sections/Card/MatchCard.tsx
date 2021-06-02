import { Card, CardContent, Grid, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import ChipComponent from '../../../Components/Card/Chip';
import { IFixtureWithScoreAndPredictions } from '../../../models/toto.models';
import { getTimeFromTimeStamp } from '../../../utils/timeFunctions';
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

type Props = { wedstrijdMetVoorspellingen: IFixtureWithScoreAndPredictions; display: string };

const MatchCard: React.FC<Props> = ({ wedstrijdMetVoorspellingen, display }: Props): ReactElement => {
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

  return (
    <Card className={classes.card}>
      <CardContent>
        {status === 'Match Finished' ? <ChipComponent score={score} /> : null}

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

          <Grid item xs={1} container justify="center" alignItems="center">
            <img className={classes.logo} alt={homeTeamLogo} src={homeTeamLogo} />
          </Grid>

          <Grid item xs={2} container justify="center" alignItems="center">
            {status === 'Time to be defined' ? (
              <Typography>t.b.a.</Typography>
            ) : status === 'Match Finished' ? (
              <Typography>
                {goalsHomeTeam} - {goalsAwayTeam}
              </Typography>
            ) : (
              <Typography>{getTimeFromTimeStamp(eventTimeStamp)}</Typography>
            )}
          </Grid>

          <Grid item xs={1} container justify="center" alignItems="center">
            <img className={classes.logo} alt={awayTeamLogo} src={awayTeamLogo} />
          </Grid>

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
