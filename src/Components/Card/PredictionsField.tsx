import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Grid, TextField, Theme, Typography, Tooltip, makeStyles } from '@material-ui/core';
import { IPrediction } from '../../models/predictions.model';
import { IFixtureWithScoreAndPredictions } from '../../models/toto.models';
import { changePrediction, postNewPrediction } from '../../store/predictions/actions';

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
  const [pGoalsHomeTeam, setPGoalsHomeTeam] = useState<number>(0);
  const [pGoalsAwayTeam, setPGoalsAwayTeam] = useState<number>(0);
  const [showInput, setShowInput] = useState<boolean>(false);

  const handleSubmit = () => {
    const prediction: IPrediction = {
      pGoalsHomeTeam,
      pGoalsAwayTeam,
      fixtureId: fixtureWithPrediction.id,
    };

    fixtureWithPrediction.predictions.pGoalsAwayTeam || fixtureWithPrediction.predictions.pGoalsHomeTeam
      ? dispatch(changePrediction(prediction))
      : dispatch(postNewPrediction(prediction));

    setShowInput(false);
  };

  const handleGoalsHomeTeam = (value: number) => {
    setPGoalsHomeTeam(value);
  };

  const handleGoalsAwayTeam = (value: number) => {
    setPGoalsAwayTeam(value);
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
            defaultValue={fixtureWithPrediction.predictions.pGoalsHomeTeam || 0}
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
            defaultValue={fixtureWithPrediction.predictions.pGoalsAwayTeam || 0}
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
      ) : (Number.isInteger(fixtureWithPrediction.predictions.pGoalsHomeTeam) ||
          Number.isInteger(fixtureWithPrediction.predictions.pGoalsAwayTeam)) &&
        fixtureWithPrediction.status === 'Match Finished' ? (
        <Typography variant="overline" color="textSecondary">
          Je voorspelling was {fixtureWithPrediction.predictions.pGoalsHomeTeam} -{' '}
          {fixtureWithPrediction.predictions.pGoalsAwayTeam}
        </Typography>
      ) : fixtureWithPrediction.status === 'Match Finished' ? (
        <Typography variant="overline" color="textSecondary">
          Geen voorspelling
        </Typography>
      ) : Math.floor(Date.now() / 1000) > fixtureWithPrediction.eventTimeStamp - 5 * 60 ? (
        <Typography variant="overline" color="textSecondary">
          Voorspelling{' '}
          <span className={classes.span}>
            {Number.isInteger(fixtureWithPrediction.predictions.pGoalsAwayTeam)
              ? `[${fixtureWithPrediction.predictions.pGoalsHomeTeam} - 
          ${fixtureWithPrediction.predictions.pGoalsAwayTeam}]`
              : '[geen]'}
          </span>{' '}
          gesloten
        </Typography>
      ) : Number.isInteger(fixtureWithPrediction.predictions.pGoalsHomeTeam) ||
        Number.isInteger(fixtureWithPrediction.predictions.pGoalsAwayTeam) ? (
        <Tooltip title="Je voorspelling veranderen?" arrow>
          <Button variant="outlined" size="small" color="secondary" onClick={() => setShowInput(true)}>
            {fixtureWithPrediction.predictions.pGoalsHomeTeam} - {fixtureWithPrediction.predictions.pGoalsAwayTeam}
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
