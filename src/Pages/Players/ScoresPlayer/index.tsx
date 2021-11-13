import { Box } from '@material-ui/core'
import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import MessageComponent from '../../../Components/Communication/Message'
import ProgressComponent from '../../../Components/Progress'
import PageTitle from '../../../Components/Title/PageTitle'
import ScoresStackedChart from '../../../Sections/Charts/ScoresStackedChart'
import { selectAppLoading } from '../../../store/appState/selectors'
import { fetchPlayerScores } from '../../../store/scores/action-creators'
import {
  selectPlayerHasScores,
  selectPlayerScores,
} from '../../../store/scores/selectors'
import { colorPrimary, colorSecondary } from '../../../theme/chartColors'

const ScoresPlayer: React.FC = (): ReactElement => {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectAppLoading)
  const scoresPlayer = useSelector(selectPlayerScores)
  const playerHasScores = useSelector(selectPlayerHasScores)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    dispatch(fetchPlayerScores(id))
  }, [dispatch, id])

  return (
    <Box>
      {isLoading ? (
        <>
          <PageTitle title="Scores" color="secondary" />
          <ProgressComponent />
        </>
      ) : scoresPlayer && playerHasScores ? (
        <>
          <PageTitle title={`Scores ${scoresPlayer.name}`} color="secondary" />
          <ScoresStackedChart
            scoresPlayer={scoresPlayer}
            colorMain={colorSecondary}
            colorHover={colorPrimary}
            loggedInUser={false}
          />
        </>
      ) : scoresPlayer ? (
        <>
          <PageTitle title={`Scores ${scoresPlayer.name}`} color="secondary" />
          <MessageComponent message="Nog geen scores" />
        </>
      ) : (
        <>
          <PageTitle title="Scores" color="secondary" />
          <MessageComponent message="Geen data gevonden" />
        </>
      )}
    </Box>
  )
}

export default ScoresPlayer
