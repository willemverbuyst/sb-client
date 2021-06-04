import { Grid } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';

import CardButton from '../../../Components/Button/CardButton';
import { IFixtureWithScoreAndPredictions } from '../../../models/toto.models';
import { hasBettingClosed } from '../../../utils/timeFunctions';
import { getPrediction } from './card-functions';
import MatchCardInput from './MatchCardInput';
import TextComponent from './Text';

interface IProps {
  fixtureWithPrediction: IFixtureWithScoreAndPredictions;
  display: 'private' | 'public';
}

const MatchCardBottom: React.FC<IProps> = ({ fixtureWithPrediction, display }: IProps): ReactElement => {
  const [showInput, setShowInput] = useState<boolean>(false);

  const {
    eventTimeStamp,
    predictions: { pGoalsAwayTeam, pGoalsHomeTeam },
    status,
  } = fixtureWithPrediction;

  const setShowInputToFalse = () => setShowInput(false);
  const setShowInputToTrue = () => setShowInput(true);

  return (
    <Grid item xs={12} container justify="center">
      <TextComponent
        xs={12}
        justify="center"
        content={getPrediction(pGoalsHomeTeam, pGoalsAwayTeam, status, eventTimeStamp, display)}
        variant="overline"
        color="textSecondary"
      />

      <>
        {status !== 'Match Finished' && !hasBettingClosed(eventTimeStamp) && display === 'private' && !showInput ? (
          <CardButton caption="Edit" color="secondary" handleClick={setShowInputToTrue} variant="text" />
        ) : status !== 'Match Finished' && !hasBettingClosed(eventTimeStamp) && display === 'private' && showInput ? (
          <MatchCardInput fixtureWithPrediction={fixtureWithPrediction} hideInput={setShowInputToFalse} />
        ) : null}
      </>
    </Grid>
  );
};

export default MatchCardBottom;
