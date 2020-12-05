import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { 
  Card, 
  CardContent, 
  Grid,
  Typography,
} from '@material-ui/core';
import { IFixtureWithScoreAndPredictions } from '../../models/toto.models';
import { timeStampFormattedToLocalDate, getTimeFromTimeStamp } from '../../utils/timeFunctions';
import PredictionsField from './PredictionsField';

const useStyles = makeStyles({
  card: {
    textAlign: 'center',
    margin: '10px',
  },
  logo: {
    height: 20,
    width: 20,
    objectFit: 'contain',
  },
  title: {
    fontSize: 14,
  },
  match: {
    cursor: 'pointer',
    height: 60,
  },
});

type Prop = { wedstrijdMetVoorspellingen: IFixtureWithScoreAndPredictions }

export default function MatchCard({ wedstrijdMetVoorspellingen }: Prop) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="overline" color="textSecondary">
        {timeStampFormattedToLocalDate(wedstrijdMetVoorspellingen.eventTimeStamp)} 
        </Typography>
        
        <Grid item xs={12} className={classes.match} container justify="center" alignItems="center" 
          onClick={()=> history.push(`/scores/wedstrijd/${wedstrijdMetVoorspellingen.id}`)}>
          <Grid item xs={4} container justify="flex-end" alignItems="center">
            <Typography>
              {wedstrijdMetVoorspellingen.homeTeamName}
            </Typography>
          </Grid>

          <Grid item xs={1} container justify="center" alignItems="center">
            <img 
              className={classes.logo} 
              alt={wedstrijdMetVoorspellingen.homeTeamLogo} 
              src={wedstrijdMetVoorspellingen.homeTeamLogo} 
            />
          </Grid>

          <Grid item xs={2} container justify="center" alignItems="center">
            { wedstrijdMetVoorspellingen.status === 'Time to be defined' ? 
                <Typography>
                  t.b.a.
                </Typography> 
              : wedstrijdMetVoorspellingen.status === 'Match Finished' ? 
                <Typography>
                  {wedstrijdMetVoorspellingen.goalsHomeTeam} - {wedstrijdMetVoorspellingen.goalsAwayTeam}
                </Typography> 
              :
                <Typography>
                  {getTimeFromTimeStamp(wedstrijdMetVoorspellingen.eventTimeStamp)} 
                </Typography>
             }
          </Grid>

          <Grid item xs={1} container justify="center" alignItems="center">
            <img 
              className={classes.logo} 
              alt={wedstrijdMetVoorspellingen.awayTeamLogo} 
              src={wedstrijdMetVoorspellingen.awayTeamLogo} 
            />
          </Grid>

          <Grid item xs={4} container justify="flex-start" alignItems="center">
            <Typography>
              {wedstrijdMetVoorspellingen.awayTeamName}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} container justify="center">
          <PredictionsField fixtureWithPrediction={wedstrijdMetVoorspellingen}/>
        </Grid>

      </CardContent>
    </Card>
  );
}
