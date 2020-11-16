import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Card, 
  CardActions, 
  CardContent, 
  Typography 
} from '@material-ui/core';

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

type Prop = { player: Player }

type Player = {
  userName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export default function PlayerCard({player}: Prop) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
        {player.userName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {player.firstName} {player.lastName}
        </Typography>
        
        <Typography variant="body2" component="p">
          {player.phoneNumber}
        </Typography>
      </CardContent>
      <CardActions>
        {player.email}
      </CardActions>
    </Card>
  );
}
