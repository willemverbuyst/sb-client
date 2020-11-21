import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postNewPrediction } from '../../store/voorspellingen/actions';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Button,
  Grid,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles({
  inputBox: {
    width: 40,
    padding: '3px',
    textAlign: 'right'
  }
});

type Props = {
  leaveInput: () => void;
  fixtureId: number;
  pGoalsHomeTeam: number | null;
  pGoalsAwayTeam: number | null;
}

export default function InputVoorspellingen(props: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [pGoalsHomeTeam, setPGoalsHomeTeam] = useState<number>(props.pGoalsHomeTeam? props.pGoalsHomeTeam : 0);
  const [pGoalsAwayTeam, setPGoalsAwayTeam] = useState<number>(props.pGoalsAwayTeam? props.pGoalsAwayTeam : 0);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

  const handleSubmit = () => {
    console.log('submit score', pGoalsHomeTeam, pGoalsAwayTeam, props.fixtureId)
    dispatch(postNewPrediction(pGoalsHomeTeam, pGoalsAwayTeam, props.fixtureId))
    props.leaveInput();
  }

  const handleGoalsHomeTeam = (value: number) => {
    setBtnDisabled(false);
    setPGoalsHomeTeam(value);    
  }

  const handleGoalsAwayTeam = (value: number) => {
    setBtnDisabled(false);
    setPGoalsAwayTeam(value);
  }

  return (
    <Grid item xs={12} container justify="center">
      <Grid item xs={2} container justify="center">
        <Button variant="contained" size="small" color="secondary" 
          disableElevation onClick={props.leaveInput}>
          Cancel
        </Button>
      </Grid>
      <Grid item xs={8} container justify="center">
        <TextField
          id="outlined-number"
          type="number"
          value={pGoalsHomeTeam}
          onChange={(e) => handleGoalsHomeTeam(+e.target.value) }
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
          value={pGoalsAwayTeam}
          onChange={(e) => handleGoalsAwayTeam(+e.target.value) }
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
      <Grid item xs={2} container justify="center">
        <Button disabled={btnDisabled} variant="contained" size="small" color="primary" 
          disableElevation onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  )
}
