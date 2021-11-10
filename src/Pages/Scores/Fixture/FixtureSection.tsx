import { Box, Grid, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'

import LogoComponent from '../../../Components/Logo'
import { IFixture } from '../../../models/toto.models'
import * as UTILS from '../../../utils'
import TextComponent from './Text'

interface IProps {
  fixture: IFixture
}

const FixtureSection: React.FC<IProps> = ({
  fixture,
}: IProps): ReactElement => {
  const {
    eventTimeStamp,
    homeTeamName,
    homeTeamLogo,
    goalsHomeTeam,
    goalsAwayTeam,
    awayTeamName,
    awayTeamLogo,
  } = fixture
  const formattedDate = UTILS.formatTimeStampToLocalDate(eventTimeStamp)
  const goals =
    Number.isInteger(goalsAwayTeam) && Number.isInteger(goalsHomeTeam)
      ? `${goalsHomeTeam} - ${goalsAwayTeam}`
      : ' - '

  return (
    <Box mb={{ sm: 0, md: 6 }}>
      <Grid item xs={12} container justify="center">
        <Box mb={2}>
          <Typography variant="overline">{formattedDate}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} container justify="center">
        <TextComponent
          xs={3}
          sm={3}
          content={homeTeamName}
          justify="flex-end"
        />
        <LogoComponent alt={homeTeamName} source={homeTeamLogo} size="medium" />
        <TextComponent xs={3} sm={1} content={goals} justify="center" />
        <LogoComponent alt={awayTeamName} source={awayTeamLogo} size="medium" />
        <TextComponent
          xs={3}
          sm={3}
          content={awayTeamName}
          justify="flex-start"
        />
      </Grid>
    </Box>
  )
}

export default FixtureSection
