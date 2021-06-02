import { Button, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';

import { IPrediction } from '../../../models/predictions.model';
import { IFixtureWithScoreAndPredictions } from '../../../models/toto.models';
import { changePrediction, postNewPrediction } from '../../../store/predictions/action-creators';
import MatchCardInput from './MatchCardInput';

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

interface IProps {
  fixtureWithPrediction: IFixtureWithScoreAndPredictions;
}

const PredictionsField: React.FC<IProps> = ({ fixtureWithPrediction }: IProps): ReactElement => {
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

  const handleGoalsHomeTeam = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpGoalsHT(Number(e.target.value));
  };

  const handleGoalsAwayTeam = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpGoalsAT(Number(e.target.value));
  };

  const setShowInputToFalse = () => setShowInput(false);
  const setShowInputToTrue = () => setShowInput(true);

  return (
    <Grid item xs={12} container justify="center">
      {showInput ? (
        <MatchCardInput
          fixtureWithPrediction={fixtureWithPrediction}
          hideInput={setShowInputToFalse}
          handleGoalsAwayTeam={handleGoalsAwayTeam}
          handleGoalsHomeTeam={handleGoalsHomeTeam}
          handleSubmit={handleSubmit}
        />
      ) : (Number.isInteger(pGoalsHomeTeam) || Number.isInteger(pGoalsAwayTeam)) && status === 'Match Finished' ? (
        <Typography variant="overline" color="textSecondary">
          Je voorspelling was {pGoalsHomeTeam} - {pGoalsAwayTeam}
        </Typography>
      ) : status === 'Match Finished' ? (
        <Typography variant="overline" color="textSecondary">
          Geen voorspelling gedaan
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
        <Typography variant="overline" color="textSecondary">
          Je voorspelling is {pGoalsHomeTeam} - {pGoalsAwayTeam}
        </Typography>
      ) : (
        <Typography variant="overline" color="textSecondary">
          Nog geen voorspelling
        </Typography>
      )}

      {fixtureWithPrediction.status !== 'Match Finished' ? (
        <Button size="small" color="secondary" onClick={setShowInputToTrue}>
          Edit
        </Button>
      ) : null}
    </Grid>
  );
};

export default PredictionsField;
