import { Box } from '@material-ui/core'
import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PageTitle from '../../../Components/Title/PageTitle'
import Guard from '../../../Sections/Guard'
import { selectAppLoading } from '../../../store/appState/selectors'
import { fetchScoresRound } from '../../../store/scores/action-creators'
import {
  selectRoundId,
  selectScoresRoundSortedByScore,
} from '../../../store/scores/selectors'
import { selectToken } from '../../../store/user/selectors'
import renderDisplay from './display'

const Round: React.FC = (): ReactElement => {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectAppLoading)
  const roundId = useSelector(selectRoundId)
  const scoresRoundSortedByScore = useSelector(selectScoresRoundSortedByScore)
  const token = useSelector(selectToken)
  const { ronde } = useParams<{ ronde: string }>()
  const round = Number(ronde)

  useEffect(() => {
    if (token && (!roundId || round !== roundId)) {
      dispatch(fetchScoresRound(round))
    }
  }, [dispatch, round, roundId, token])

  return (
    <Guard
      content={
        <Box>
          <PageTitle title={`Speelronde ${round}`} color="secondary" />
          {renderDisplay({ isLoading, round, scoresRoundSortedByScore })}
        </Box>
      }
    />
  )
}

export default Round
