import { Card, CardContent, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { ReactElement } from 'react'

import ChipComponent from '../../Components/Chip'
import { IFixtureWithScoreAndPredictions } from '../../models/toto.models'
import MatchCardBottom from './MatchCardBottom'
import MatchCardMiddle from './MatchCardMiddle'
import MatchCardTop from './MatchCardTop'

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    [theme.breakpoints.down('xs')]: {
      margin: '10px -5px',
    },
    textAlign: 'center',
    margin: '10px',
    position: 'relative',
  },
}))

interface IProps {
  wedstrijdMetVoorspellingen: IFixtureWithScoreAndPredictions
  display: 'private' | 'public'
  userNamePlayer: string
}

const MatchCard: React.FC<IProps> = ({
  wedstrijdMetVoorspellingen,
  display,
  userNamePlayer,
}: IProps): ReactElement => {
  const classes = useStyles()
  const { eventTimeStamp, score, status } = wedstrijdMetVoorspellingen

  return (
    <Card className={classes.card}>
      <CardContent>
        {status === 'Match Finished' ? <ChipComponent score={score} /> : null}
        <MatchCardTop eventTimeStamp={eventTimeStamp} />
        <MatchCardMiddle fixtureWithPrediction={wedstrijdMetVoorspellingen} />
        <MatchCardBottom
          fixtureWithPrediction={wedstrijdMetVoorspellingen}
          display={display}
          userNamePlayer={userNamePlayer}
        />
      </CardContent>
    </Card>
  )
}

export default MatchCard
