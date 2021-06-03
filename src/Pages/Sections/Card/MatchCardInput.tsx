import { Grid } from '@material-ui/core';
import React, { ReactElement } from 'react';

import CardButton from '../../../Components/Button/CardButton';
import NumberField from '../../../Components/Form/NumberField';
import { IFixtureWithScoreAndPredictions } from '../../../models/toto.models';

interface IProps {
  fixtureWithPrediction: IFixtureWithScoreAndPredictions;
  hideInput: () => void;
  handleGoalsHomeTeam: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGoalsAwayTeam: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

const MatchCardInput: React.FC<IProps> = ({
  fixtureWithPrediction,
  hideInput,
  handleGoalsHomeTeam,
  handleGoalsAwayTeam,
  handleSubmit,
}: IProps): ReactElement => {
  const {
    predictions: { pGoalsAwayTeam, pGoalsHomeTeam },
  } = fixtureWithPrediction;

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
