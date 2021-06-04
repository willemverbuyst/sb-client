import { Button, Grid, Typography } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';

import { IFixtureWithScoreAndPredictions } from '../../../models/toto.models';
import { hasBettingClosed } from '../../../utils/timeFunctions';
import { getPrediction } from './card-functions';
import MatchCardInput from './MatchCardInput';

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
      <Grid item xs={12} container justify="center">
        <Typography variant="overline" color="textSecondary">
          {getPrediction(pGoalsHomeTeam, pGoalsAwayTeam, status, eventTimeStamp, display)}
        </Typography>
      </Grid>
      <>
        {status !== 'Match Finished' && !hasBettingClosed(eventTimeStamp) && display === 'private' && !showInput ? (
          <Grid item xs={12} container justify="center">
            <Button size="small" color="secondary" onClick={setShowInputToTrue}>
              Edit
            </Button>
          </Grid>
        ) : status !== 'Match Finished' && !hasBettingClosed(eventTimeStamp) && display === 'private' && showInput ? (
          <MatchCardInput fixtureWithPrediction={fixtureWithPrediction} hideInput={setShowInputToFalse} />
        ) : null}
      </>
    </Grid>
  );
};

export default MatchCardBottom;
