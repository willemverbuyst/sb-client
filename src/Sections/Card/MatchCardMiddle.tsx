import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { ReactElement } from 'react'

import LogoComponent from '../../Components/Logo'
import * as HISTORY from '../../history'
import { IFixtureWithScoreAndPredictions } from '../../models/toto.models'
import * as UTILS from '../../utils'
import TextComponent from './Text'

const useStyles = makeStyles(() => ({
  match: {
    cursor: 'pointer',
    height: 60,
  },
}))

interface IProps {
  fixtureWithPrediction: IFixtureWithScoreAndPredictions
}

const MatchCardMiddle: React.FC<IProps> = ({
  fixtureWithPrediction,
}: IProps): ReactElement => {
  const classes = useStyles()
  const {
    awayTeamLogo,
    awayTeamName,
    eventTimeStamp,
    goalsAwayTeam,
    goalsHomeTeam,
    homeTeamName,
    homeTeamLogo,
    id,
    status,
  } = fixtureWithPrediction

  const gotoFixture = () => HISTORY.gotoFixture(id)

  return (
    <Grid
      item
      xs={12}
      className={classes.match}
      container
      justify="center"
      alignItems="center"
      onClick={gotoFixture}
    >
      <TextComponent xs={4} content={homeTeamName} justify="flex-end" />
      <LogoComponent alt={homeTeamName} source={homeTeamLogo} size="small" />
      <TextComponent
        xs={2}
        content={UTILS.getOutCome(
          status,
          goalsHomeTeam,
          goalsAwayTeam,
          eventTimeStamp
        )}
        justify="center"
      />
      <LogoComponent alt={awayTeamName} source={awayTeamLogo} size="small" />
      <TextComponent xs={4} content={awayTeamName} justify="flex-start" />
    </Grid>
  )
}

export default MatchCardMiddle
