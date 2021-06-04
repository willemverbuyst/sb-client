import { Grid } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';

import CardButton from '../../../Components/Button/CardButton';
import NumberField from '../../../Components/Form/NumberField';
import { IPrediction } from '../../../models/predictions.model';
import { IFixtureWithScoreAndPredictions } from '../../../models/toto.models';
import { changePrediction, postNewPrediction } from '../../../store/predictions/action-creators';

interface IProps {
  fixtureWithPrediction: IFixtureWithScoreAndPredictions;
  hideInput: () => void;
}

const MatchCardInput: React.FC<IProps> = ({ fixtureWithPrediction, hideInput }: IProps): ReactElement => {
  const {
    id,
    predictions: { pGoalsAwayTeam, pGoalsHomeTeam },
  } = fixtureWithPrediction;
  const dispatch = useDispatch();
  const [pGoalsHT, setpGoalsHT] = useState<number>(0);
  const [pGoalsAT, setpGoalsAT] = useState<number>(0);

  const handleSubmit = () => {
    const prediction: IPrediction = {
      pGoalsHomeTeam: pGoalsHT,
      pGoalsAwayTeam: pGoalsAT,
      fixtureId: id,
    };

    Number.isInteger(pGoalsAwayTeam) || Number.isInteger(pGoalsHomeTeam)
      ? dispatch(changePrediction(prediction))
      : dispatch(postNewPrediction(prediction));

    hideInput();
  };

  const handleGoalsHomeTeam = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpGoalsHT(Number(e.target.value));
  };

  const handleGoalsAwayTeam = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpGoalsAT(Number(e.target.value));
  };

  return (
    <Grid item xs={12} container justify="center">
      <Grid item xs={2} container justify="center">
        <CardButton caption="Cancel" color="secondary" handleClick={hideInput} />
      </Grid>

      <Grid item xs={8} container justify="center">
        <NumberField defaultValue={pGoalsHomeTeam || 0} onChange={handleGoalsHomeTeam} />
        &nbsp;&nbsp;-&nbsp;&nbsp;
        <NumberField defaultValue={pGoalsAwayTeam || 0} onChange={handleGoalsAwayTeam} />
      </Grid>

      <Grid item xs={2} container justify="center">
        <CardButton caption="Submit" color="primary" handleClick={handleSubmit} />
      </Grid>
    </Grid>
  );
};

export default MatchCardInput;
