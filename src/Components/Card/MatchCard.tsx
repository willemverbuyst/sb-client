import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { 
  Avatar,
  Card, 
  CardContent, 
  Grid,
  Typography 
} from '@material-ui/core';
import { WedstrijdMetVoorspellingen } from '../../store/voorspellingen/types';
import { timeStampFormattedToLocalDate, getTimeFromTimeStamp } from '../../utils/timeFunctions';

const useStyles = makeStyles({
  card: {
    textAlign: 'center',
    margin: '10px',
    cursor: 'pointer',
  },
  avatar: {
    height: 20,
    width: 20
  },
  title: {
    fontSize: 14,
  },
  match: {
    height: 60,
  }
});

type Prop = { wedstrijdMetVoorspellingen: WedstrijdMetVoorspellingen }

export default function MatchCard({wedstrijdMetVoorspellingen}: Prop) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.card} onClick={()=> history.push(`/scores/match/${wedstrijdMetVoorspellingen.id}`)}>
      <CardContent>
        <Typography variant="overline" color="textSecondary">
        {timeStampFormattedToLocalDate(wedstrijdMetVoorspellingen.eventTimeStamp)} 
        </Typography>
        
        <Grid xs={12} className={classes.match}container justify="center" alignItems="center">
          <Grid item xs={4} container justify="flex-end" alignItems="center">
            <Typography>
              {wedstrijdMetVoorspellingen.homeTeamName}
            </Typography>
          </Grid>

          <Grid item xs={1} container justify="center" alignItems="center">
            <Avatar className={classes.avatar} alt={wedstrijdMetVoorspellingen.homeTeamLogo} src={wedstrijdMetVoorspellingen.homeTeamLogo} />
          </Grid>

          <Grid item xs={2} container justify="center" alignItems="center">
            {wedstrijdMetVoorspellingen.status === 'Time to be defined' ? 
              <Typography>
                t.b.a.
              </Typography> 
              :
              wedstrijdMetVoorspellingen.goalsHomeTeam || wedstrijdMetVoorspellingen.goalsAwayTeam ? 
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
            <Avatar className={classes.avatar} alt={wedstrijdMetVoorspellingen.awayTeamLogo} src={wedstrijdMetVoorspellingen.awayTeamLogo} />
          </Grid>

          <Grid item xs={4} container justify="flex-start" alignItems="center">
          <Typography>
            {wedstrijdMetVoorspellingen.awayTeamName}
          </Typography>
          </Grid>
        </Grid>

        {wedstrijdMetVoorspellingen.predictions.pGoalsHomeTeam && wedstrijdMetVoorspellingen.predictions.pGoalsAwayTeam ?
            <Typography variant="overline" color="textSecondary">
            {wedstrijdMetVoorspellingen.predictions.pGoalsHomeTeam} - {wedstrijdMetVoorspellingen.predictions.pGoalsAwayTeam} 
            </Typography>
            :
            <Typography variant="overline" color="textSecondary">
            Geen voorspelling
            </Typography>
            }

      </CardContent>
    </Card>
  );
}
