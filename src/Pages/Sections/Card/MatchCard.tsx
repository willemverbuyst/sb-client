import { Card, CardContent, Chip, Grid, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import { IFixtureWithScoreAndPredictions } from '../../../models/toto.models';
import { getTimeFromTimeStamp, timeStampFormattedToLocalDate } from '../../../utils/timeFunctions';
import PredictionsField from './PredictionsField';
import PredictionsHome from './PredictionsHome';
import PublicPredictions from './PublicPredictions';

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
  chip: {
    position: 'absolute',
    right: 5,
    top: 5,
    transform: 'rotate(12deg)',
    color: '#c5c5c5',
    border: 'none',
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
        {status === 'Match Finished' ? (
          <Chip size="small" className={classes.chip} label={`${score} pt.`} variant="outlined" />
        ) : null}

        <Typography variant="overline" color="textSecondary">
          {timeStampFormattedToLocalDate(eventTimeStamp)}
        </Typography>

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

        <Grid item xs={12} container justify="center">
          {display === 'public' ? (
            <PublicPredictions fixtureWithPrediction={wedstrijdMetVoorspellingen} />
          ) : display === 'Predictions' ? (
            <PredictionsField fixtureWithPrediction={wedstrijdMetVoorspellingen} />
          ) : (
            <PredictionsHome fixtureWithPrediction={wedstrijdMetVoorspellingen} />
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
