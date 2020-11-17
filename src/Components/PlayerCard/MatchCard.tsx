import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Card, 
  CardActions, 
  CardContent, 
  Typography 
} from '@material-ui/core';
import { WedstrijdMetVoorspellingen } from '../../store/voorspellingen/types';

const useStyles = makeStyles({
  root: {
    width: 275,
    margin: 20,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
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
        <Typography className={classes.pos} color="textSecondary">
          {wedstrijdMetVoorspellingen.homeTeamName} - {wedstrijdMetVoorspellingen.awayTeamName}
        </Typography>
      </CardContent>
    </Card>
  );
}
