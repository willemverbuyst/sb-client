import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { 
  Avatar,
  Card, 
  CardContent, 
  Grid,
  TextField,
  Typography 
} from '@material-ui/core';
import { WedstrijdMetVoorspellingen } from '../../store/voorspellingen/types';
import { timeStampFormattedToLocalDate, getTimeFromTimeStamp } from '../../utils/timeFunctions';

const useStyles = makeStyles({
  card: {
    textAlign: 'center',
    margin: '10px',
  },
  avatar: {
    height: 20,
    width: 20
  },
  title: {
    fontSize: 14,
  },
  match: {
    cursor: 'pointer',
    height: 60,
  },
  inputBox: {
    width: 40,
    padding: '3px',
    textAlign: 'right'
  }
});

type Prop = { wedstrijdMetVoorspellingen: WedstrijdMetVoorspellingen }

export default function MatchCard({wedstrijdMetVoorspellingen}: Prop) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="overline" color="textSecondary">
        {timeStampFormattedToLocalDate(wedstrijdMetVoorspellingen.eventTimeStamp)} 
        </Typography>
        
        <Grid item xs={12} className={classes.match}container justify="center" alignItems="center" 
          onClick={()=> history.push(`/scores/match/${wedstrijdMetVoorspellingen.id}`)}>
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

        {(wedstrijdMetVoorspellingen.goalsHomeTeam || wedstrijdMetVoorspellingen.goalsAwayTeam) &&
          (!wedstrijdMetVoorspellingen.predictions.pGoalsHomeTeam || !wedstrijdMetVoorspellingen.predictions.pGoalsAwayTeam) ? 
            <Typography variant="overline" color="textSecondary">
              Geen voorspelling
            </Typography>
          : wedstrijdMetVoorspellingen.predictions.pGoalsHomeTeam && wedstrijdMetVoorspellingen.predictions.pGoalsAwayTeam ?
            <Typography variant="overline" color="textSecondary">
              {wedstrijdMetVoorspellingen.predictions.pGoalsHomeTeam} - {wedstrijdMetVoorspellingen.predictions.pGoalsAwayTeam} 
            </Typography>
          :
          <Grid item xs={12} container justify="center">
            <TextField
              id="outlined-number"
              type="number"
              onChange={()=> console.log('input')}
              InputProps={{
                classes: {
                  input: classes.inputBox,
                },
                inputProps: { 
                  min: 0,
                  max: 99
              }
              }}
            />
            &nbsp;&nbsp;-&nbsp;&nbsp;
            <TextField
              id="outlined-number"
              type="number"
              onChange={()=> console.log('input')}
              InputProps={{
                classes: {
                  input: classes.inputBox,
                },
                inputProps: { 
                  min: 0,
                  max: 99
              }
              }}
            />
          </Grid>
        }
      </CardContent>
    </Card>
  );
}
