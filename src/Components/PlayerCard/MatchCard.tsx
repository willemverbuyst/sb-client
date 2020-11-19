import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Card, 
  CardContent, 
  Typography 
} from '@material-ui/core';
import { WedstrijdMetVoorspellingen } from '../../store/voorspellingen/types';
import { timeStamptFormattedToLocalDate } from '../../utils/timeFunctions';

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
        <Typography variant="h5" component="h2">
        {timeStamptFormattedToLocalDate(wedstrijdMetVoorspellingen.eventTimeStamp)}
        </Typography>
        <Typography color="textSecondary">
          {wedstrijdMetVoorspellingen.homeTeamName} - {wedstrijdMetVoorspellingen.awayTeamName}
        </Typography>

        {wedstrijdMetVoorspellingen.goalsHomeTeam || wedstrijdMetVoorspellingen.goalsAwayTeam ? 
          <Typography color="textSecondary">
            {wedstrijdMetVoorspellingen.goalsHomeTeam} - {wedstrijdMetVoorspellingen.goalsAwayTeam}
          </Typography> :
          <Typography color="textSecondary" variant="overline">
            {wedstrijdMetVoorspellingen.status}
          </Typography>
        }
      </CardContent>
    </Card>
  );
}
