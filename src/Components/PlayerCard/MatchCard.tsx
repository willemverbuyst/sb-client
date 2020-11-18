import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Card, 
  CardContent, 
  Typography 
} from '@material-ui/core';
import { WedstrijdMetVoorspellingen } from '../../store/voorspellingen/types';

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
        {new Date(wedstrijdMetVoorspellingen.eventTimeStamp * 1000).toDateString()}
        </Typography>
        <Typography color="textSecondary">
          {wedstrijdMetVoorspellingen.homeTeamName} - {wedstrijdMetVoorspellingen.awayTeamName}
        </Typography>
      </CardContent>
    </Card>
  );
}
