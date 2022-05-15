import { Box } from '@material-ui/core'
import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MessageComponent from '../../../Components/Communication/Message'
import ProgressComponent from '../../../Components/Progress'
import PageTitle from '../../../Components/Title/PageTitle'
import ScoresStackedChart from '../../../Sections/Charts/ScoresStackedChart'
import Guard from '../../../Sections/Guard'
import { selectAppLoading } from '../../../store/appState/selectors'
import { fetchPlayerScores } from '../../../store/scores/action-creators'
import {
  selectPlayerHasScores,
  selectPlayerScores,
} from '../../../store/scores/selectors'
import { selectToken, selectUser } from '../../../store/user/selectors'
import { colorPrimary, colorSecondary } from '../../../theme/chartColors'

const ScoresUser: React.FC = (): ReactElement => {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectAppLoading)
  const scoresPlayer = useSelector(selectPlayerScores)
  const playerHasScores = useSelector(selectPlayerHasScores)
  const token = useSelector(selectToken)
  const user = useSelector(selectUser)

  useEffect(() => {
    if (token && user) {
      dispatch(fetchPlayerScores(user.id))
    }
  }, [dispatch, token, user])

  return (
    <Guard
      content={
        <Box>
          <PageTitle title="Mijn scores" color="primary" />
          {isLoading ? (
            <ProgressComponent />
          ) : scoresPlayer && playerHasScores ? (
            <ScoresStackedChart
              scoresPlayer={scoresPlayer}
              colorMain={colorPrimary}
              colorHover={colorSecondary}
              loggedInUser
            />
          ) : (
            <MessageComponent message="Je hebt nog geen scores" />
          )}
        </Box>
      }
    />
  )
}

export default ScoresUser
