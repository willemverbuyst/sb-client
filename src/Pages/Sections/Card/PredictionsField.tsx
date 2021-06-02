import { Button, Grid, makeStyles, TextField, Theme, Tooltip, Typography } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';

import { IPrediction } from '../../../models/predictions.model';
import { IFixtureWithScoreAndPredictions } from '../../../models/toto.models';
import { changePrediction, postNewPrediction } from '../../../store/predictions/action-creators';

const useStyles = makeStyles((theme: Theme) => ({
  inputBox: {
    width: 40,
    padding: '3px',
    textAlign: 'right',
  },
  span: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    letterSpacing: '3px',
  },
}));

type Props = { fixtureWithPrediction: IFixtureWithScoreAndPredictions };

const PredictionsField: React.FC<Props> = ({ fixtureWithPrediction }: Props): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [pGoalsHT, setpGoalsHT] = useState<number>(0);
  const [pGoalsAT, setpGoalsAT] = useState<number>(0);
  const [showInput, setShowInput] = useState<boolean>(false);
  const {
    id,
    eventTimeStamp,
    predictions: { pGoalsAwayTeam, pGoalsHomeTeam },
    status,
  } = fixtureWithPrediction;

  const handleSubmit = () => {
    const prediction: IPrediction = {
      pGoalsHomeTeam: pGoalsHT,
      pGoalsAwayTeam: pGoalsAT,
      fixtureId: id,
    };

    Number.isInteger(pGoalsAwayTeam) || Number.isInteger(pGoalsHomeTeam)
      ? dispatch(changePrediction(prediction))
      : dispatch(postNewPrediction(prediction));

    setShowInput(false);
  };

  const handleGoalsHomeTeam = (value: number) => {
    setpGoalsHT(value);
  };

  const handleGoalsAwayTeam = (value: number) => {
    setpGoalsAT(value);
  };

  const renderInput = () => {
    return (
      <>
        <Grid item xs={2} container justify="center">
          <Button
            variant="contained"
            size="small"
            color="secondary"
            disableElevation
            onClick={() => setShowInput(false)}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={8} container justify="center">
          <TextField
            id="outlined-number"
            type="number"
            defaultValue={pGoalsHomeTeam || 0}
            onChange={(e) => handleGoalsHomeTeam(+e.target.value)}
            InputProps={{
              classes: {
                input: classes.inputBox,
              },
              inputProps: {
                min: 0,
                max: 99,
              },
            }}
          />
          &nbsp;&nbsp;-&nbsp;&nbsp;
          <TextField
            id="outlined-number"
            type="number"
            defaultValue={pGoalsAwayTeam || 0}
            onChange={(e) => handleGoalsAwayTeam(+e.target.value)}
            InputProps={{
              classes: {
                input: classes.inputBox,
              },
              inputProps: {
                min: 0,
                max: 99,
              },
            }}
          />
        </Grid>

        <Grid item xs={2} container justify="center">
          <Button variant="contained" size="small" color="primary" disableElevation onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </>
    );
  };

  return (
    <Grid item xs={12} container justify="center">
      {showInput ? (
        renderInput()
      ) : (Number.isInteger(pGoalsHomeTeam) || Number.isInteger(pGoalsAwayTeam)) && status === 'Match Finished' ? (
        <Typography variant="overline" color="textSecondary">
          Je voorspelling was {pGoalsHomeTeam} - {pGoalsAwayTeam}
        </Typography>
      ) : status === 'Match Finished' ? (
        <Typography variant="overline" color="textSecondary">
          Geen voorspelling
        </Typography>
      ) : Math.floor(Date.now() / 1000) > eventTimeStamp - 5 * 60 ? (
        <Typography variant="overline" color="textSecondary">
          Voorspelling{' '}
          <span className={classes.span}>
            {Number.isInteger(pGoalsAwayTeam) ? `[${pGoalsHomeTeam} - ${pGoalsAwayTeam}]` : '[geen]'}
          </span>{' '}
          gesloten
        </Typography>
      ) : Number.isInteger(pGoalsHomeTeam) || Number.isInteger(pGoalsAwayTeam) ? (
        <Tooltip title="Je voorspelling veranderen?" arrow>
          <Button variant="outlined" size="small" color="secondary" onClick={() => setShowInput(true)}>
            {pGoalsHomeTeam} - {pGoalsAwayTeam}
          </Button>
        </Tooltip>
      ) : (
        <Button variant="outlined" size="small" color="secondary" onClick={() => setShowInput(true)}>
          Plaats voorspelling
        </Button>
      )}
    </Grid>
  );
};

export default PredictionsField;
