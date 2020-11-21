import React, { useState} from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { 
  Avatar,
  Button,
  Card, 
  CardContent, 
  Grid,
  Typography,
  Tooltip
} from '@material-ui/core';
import { WedstrijdMetVoorspellingen } from '../../store/voorspellingen/types';
import { timeStampFormattedToLocalDate, getTimeFromTimeStamp } from '../../utils/timeFunctions';
import InputVoorspellingen from '../Input/InputVoorspellingen';

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
});

type Prop = { wedstrijdMetVoorspellingen: WedstrijdMetVoorspellingen }

export default function MatchCard({ wedstrijdMetVoorspellingen }: Prop) {
  const classes = useStyles();
  const history = useHistory();
  const [showInput, setShowInput] = useState<boolean>(false)

  const handleCancel = () => setShowInput(false)

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
              wedstrijdMetVoorspellingen.status === 'Match Finished' ? 
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

        <Grid item xs={12} container justify="center">
          {wedstrijdMetVoorspellingen.status === 'Match Finished' &&
            (!wedstrijdMetVoorspellingen.predictions.pGoalsHomeTeam || !wedstrijdMetVoorspellingen.predictions.pGoalsAwayTeam) ? 
              <Typography variant="overline" color="textSecondary">
                Geen voorspelling
              </Typography>
            : wedstrijdMetVoorspellingen.status === 'Match Finished' ?
              <Typography variant="overline" color="textSecondary">
                {wedstrijdMetVoorspellingen.predictions.pGoalsHomeTeam} - {wedstrijdMetVoorspellingen.predictions.pGoalsAwayTeam} 
              </Typography>
            : showInput ?
              <InputVoorspellingen leaveInput={handleCancel} fixtureId={wedstrijdMetVoorspellingen.id} pGoalsAwayTeam={wedstrijdMetVoorspellingen.predictions.pGoalsAwayTeam} pGoalsHomeTeam={wedstrijdMetVoorspellingen.predictions.pGoalsHomeTeam}  />
            : wedstrijdMetVoorspellingen.predictions.pGoalsHomeTeam && wedstrijdMetVoorspellingen.predictions.pGoalsAwayTeam ?
              <Tooltip title="Je voorspelling veranderen?" arrow>
                <Button variant="outlined" size="small" color="secondary" onClick={() => setShowInput(true)}>
                  {wedstrijdMetVoorspellingen.predictions.pGoalsHomeTeam} - {wedstrijdMetVoorspellingen.predictions.pGoalsAwayTeam} 
                </Button>
              </Tooltip>
            :
              <Button variant="outlined" size="small" color="secondary" onClick={() => setShowInput(true)}>
                Plaats Voorspelling
              </Button>
          }
        </Grid>

      </CardContent>
    </Card>
  );
}
