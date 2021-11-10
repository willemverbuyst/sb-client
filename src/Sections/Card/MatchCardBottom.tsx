import { Grid, Typography } from '@material-ui/core'
import React, { ReactElement, useState } from 'react'

import CardButton from '../../Components/Button/CardButton'
import { IFixtureWithScoreAndPredictions } from '../../models/toto.models'
import * as UTILS from '../../utils'
import MatchCardInput from './MatchCardInput'

interface IProps {
  fixtureWithPrediction: IFixtureWithScoreAndPredictions
  display: 'private' | 'public'
  userNamePlayer: string
}

const MatchCardBottom: React.FC<IProps> = ({
  fixtureWithPrediction,
  display,
  userNamePlayer,
}: IProps): ReactElement => {
  const [showInput, setShowInput] = useState<boolean>(false)

  const {
    eventTimeStamp,
    predictions: { pGoalsAwayTeam, pGoalsHomeTeam },
    status,
  } = fixtureWithPrediction

  const setShowInputToFalse = () => setShowInput(false)
  const setShowInputToTrue = () => setShowInput(true)

  const prediction = UTILS.getPrediction(
    pGoalsHomeTeam,
    pGoalsAwayTeam,
    status,
    eventTimeStamp,
    display,
    userNamePlayer
  )

  const renderEditButton = (): ReactElement | null =>
    status !== 'Match Finished' &&
    !UTILS.hasBettingClosed(eventTimeStamp) &&
    display === 'private' &&
    !showInput ? (
      <CardButton
        caption="Edit"
        color="secondary"
        handleClick={setShowInputToTrue}
        variant="text"
      />
    ) : null

  const renderInput = (): ReactElement | null =>
    status !== 'Match Finished' &&
    !UTILS.hasBettingClosed(eventTimeStamp) &&
    display === 'private' ? (
      <MatchCardInput
        fixtureWithPrediction={fixtureWithPrediction}
        hideInput={setShowInputToFalse}
      />
    ) : null

  return (
    <Grid item xs={12} container justify="center">
      {!showInput ? (
        <Grid item xs={12} container justify="center" alignItems="center">
          <Typography variant="overline" color="textSecondary">
            {prediction}
          </Typography>

          {renderEditButton()}
        </Grid>
      ) : (
        renderInput()
      )}
    </Grid>
  )
}

export default MatchCardBottom
