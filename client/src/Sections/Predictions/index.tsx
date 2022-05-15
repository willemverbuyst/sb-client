import { Box, Grid } from '@material-ui/core'
import React, { ReactElement } from 'react'

import { IFixtureWithScoreAndPredictions } from '../../models/toto.models'
import MatchCard from '../Card/MatchCard'

interface IProps {
  predictions: IFixtureWithScoreAndPredictions[]
  display: 'private' | 'public'
  userNamePlayer?: string
}

const Predictions: React.FC<IProps> = ({
  predictions,
  display,
  userNamePlayer = '',
}: IProps): ReactElement => (
  <Box my={{ sm: 1, md: 4 }}>
    <Grid item xs={12} container justify="center">
      {predictions.map((wedstrijd) => (
        <Grid item key={wedstrijd.id} lg={4} md={6} xs={12}>
          <MatchCard
            wedstrijdMetVoorspellingen={wedstrijd}
            display={display}
            userNamePlayer={userNamePlayer}
          />
        </Grid>
      ))}
    </Grid>
  </Box>
)

export default Predictions
