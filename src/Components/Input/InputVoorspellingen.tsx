import React, { useState } from 'react';
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

export default function InputVoorspellingen() {
  const classes = useStyles();
  const [pGoalsHomeTeam, setPGoalsHomeTeam] = useState<number>()
  const [pGoalsAwayTeam, setPGoalsAwayTeam] = useState<number>()

  const disable = !(typeof pGoalsHomeTeam === 'number' && typeof pGoalsAwayTeam === 'number')

  const handleSubmit = () => {
    console.log('submit score', pGoalsHomeTeam, pGoalsAwayTeam)
  }

  return <Grid item xs={12} container justify="center">
            <Grid item xs={2} container justify="center"></Grid>
            <Grid item xs={8} container justify="center">
            <TextField
              id="outlined-number"
              type="number"
              onChange={(e)=> setPGoalsHomeTeam(+e.target.value)}
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
              onChange={(e)=> setPGoalsAwayTeam(+e.target.value)}
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
              <Button disabled={disable} variant="contained" size="small" color="secondary" 
                disableElevation onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>

}
