import { Button, Grid, Typography } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';

import { IPrediction } from '../../../models/predictions.model';
import { IFixtureWithScoreAndPredictions } from '../../../models/toto.models';
import { changePrediction, postNewPrediction } from '../../../store/predictions/action-creators';
import { hasBettingClosed } from '../../../utils/timeFunctions';
import MatchCardInput from './MatchCardInput';
import { getPrivatePrediction } from './prediction-functions';

interface IProps {
  fixtureWithPrediction: IFixtureWithScoreAndPredictions;
}

const PredictionsField: React.FC<IProps> = ({ fixtureWithPrediction }: IProps): ReactElement => {
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
      {status !== 'Match Finished' && !hasBettingClosed(eventTimeStamp) && showInput ? (
        <MatchCardInput
          fixtureWithPrediction={fixtureWithPrediction}
          hideInput={setShowInputToFalse}
          handleGoalsAwayTeam={handleGoalsAwayTeam}
          handleGoalsHomeTeam={handleGoalsHomeTeam}
          handleSubmit={handleSubmit}
        />
      ) : (
        <>
          <Grid item xs={12} container justify="center">
            <Typography variant="overline" color="textSecondary">
              {getPrivatePrediction(pGoalsHomeTeam, pGoalsAwayTeam, status, eventTimeStamp)}
            </Typography>
          </Grid>
          {status !== 'Match Finished' && !hasBettingClosed(eventTimeStamp) ? (
            <Grid item xs={12} container justify="center">
              <Button size="small" color="secondary" onClick={setShowInputToTrue}>
                Edit
              </Button>
            </Grid>
          ) : null}
        </>
      )}
    </Grid>
  );
};

export default PredictionsField;
