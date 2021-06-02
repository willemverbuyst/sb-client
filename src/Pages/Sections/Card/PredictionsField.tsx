import { Button, Grid, makeStyles, Theme, Tooltip, Typography } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';

import CardButton from '../../../Components/Button/CardButton';
import NumberField from '../../../Components/Form/NumberField';
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

  const setShowInputToFalse = () => setShowInput(false);
  const setShowInputToTrue = () => setShowInput(true);

  const renderInput = () => {
    return (
      <>
        <Grid item xs={2} container justify="center">
          <CardButton caption="Cancel" color="secondary" handleClick={setShowInputToFalse} />
        </Grid>
        <Grid item xs={8} container justify="center">
          <NumberField defaultValue={pGoalsHomeTeam || 0} onChange={(e) => handleGoalsHomeTeam(+e.target.value)} />
          &nbsp;&nbsp;-&nbsp;&nbsp;
          <NumberField defaultValue={pGoalsAwayTeam || 0} onChange={(e) => handleGoalsAwayTeam(+e.target.value)} />
        </Grid>

        <Grid item xs={2} container justify="center">
          <CardButton caption="Submit" color="primary" handleClick={handleSubmit} />
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
    </Grid>
  );
};

export default PredictionsField;
