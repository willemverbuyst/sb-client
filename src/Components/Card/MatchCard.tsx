import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Card, 
  CardContent, 
  Typography 
} from '@material-ui/core';
import { WedstrijdMetVoorspellingen } from '../../store/voorspellingen/types';
import { timeStamptFormattedToLocalDate, getTimeFromTimeStamp } from '../../utils/timeFunctions';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    margin: '10px',
  },
  title: {
    fontSize: 14,
  },
});

type Prop = { wedstrijdMetVoorspellingen: WedstrijdMetVoorspellingen }

export default function MatchCard({wedstrijdMetVoorspellingen}: Prop) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography>
        {timeStamptFormattedToLocalDate(wedstrijdMetVoorspellingen.eventTimeStamp)}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {wedstrijdMetVoorspellingen.homeTeamName} - {wedstrijdMetVoorspellingen.awayTeamName}
        </Typography>

        {wedstrijdMetVoorspellingen.goalsHomeTeam || wedstrijdMetVoorspellingen.goalsAwayTeam ? 
          <Typography color="textSecondary" variant="overline">
            {wedstrijdMetVoorspellingen.goalsHomeTeam} - {wedstrijdMetVoorspellingen.goalsAwayTeam}
          </Typography> :
          wedstrijdMetVoorspellingen.status === 'Not Started' ? 
          <Typography color="textSecondary" variant="overline">
            {getTimeFromTimeStamp(wedstrijdMetVoorspellingen.eventTimeStamp)} - {wedstrijdMetVoorspellingen.status}
          </Typography> :
          <Typography color="textSecondary" variant="overline">
            {wedstrijdMetVoorspellingen.status}
          </Typography> 

        }
      </CardContent>
    </Card>
  );
}
