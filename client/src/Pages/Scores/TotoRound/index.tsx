import { Box } from '@material-ui/core'
import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import PageTitle from '../../../Components/Title/PageTitle'
import Guard from '../../../Sections/Guard'
import { selectAppLoading } from '../../../store/appState/selectors'
import { fetchScoresTotoRound } from '../../../store/scores/action-creators'
import {
  selectScoresTotoRoundSortedByScore,
  selectTotoRoundId,
} from '../../../store/scores/selectors'
import { selectToken } from '../../../store/user/selectors'
import renderDisplay from './display'

const TotoRound: React.FC = (): ReactElement => {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectAppLoading)
  const scoresRoundSortedByScore = useSelector(
    selectScoresTotoRoundSortedByScore
  )
  const token = useSelector(selectToken)
  const totoRoundId = useSelector(selectTotoRoundId)
  const { totoronde } = useParams<{ totoronde: string }>()
  const totoRound = Number(totoronde)

  useEffect(() => {
    if (token && (!totoRoundId || totoRound !== totoRoundId)) {
      dispatch(fetchScoresTotoRound(totoRound))
    }
  }, [dispatch, totoRound, totoRoundId, token])

  return (
    <Guard
      content={
        <Box>
          <PageTitle title={`Totoronde ${totoRound}`} color="secondary" />
          {renderDisplay({ isLoading, totoRound, scoresRoundSortedByScore })}
        </Box>
      }
    />
  )
}

export default TotoRound
