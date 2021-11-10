import { Box } from '@material-ui/core'
import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import MessageComponent from '../../../Components/Communication/Message'
import ProgressComponent from '../../../Components/Progress'
import PageTitle from '../../../Components/Title/PageTitle'
import ScoresBarChart from '../../../Sections/Charts/ScoresBarChart'
import Guard from '../../../Sections/Guard'
import { selectAppLoading } from '../../../store/appState/selectors'
import { fetchScoresTotoRound } from '../../../store/scores/action-creators'
import {
  selectScoresTotoRoundSortedByScore,
  selectTotoRoundId,
} from '../../../store/scores/selectors'
import { selectToken } from '../../../store/user/selectors'
import Pagination from './Pagination'

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
          {isLoading ? (
            <ProgressComponent />
          ) : scoresRoundSortedByScore && scoresRoundSortedByScore.length ? (
            <>
              <Pagination totoRound={totoRound} />
              <ScoresBarChart scores={scoresRoundSortedByScore} />
            </>
          ) : (
            <>
              <MessageComponent message="Nog geen scores voor totoronde" />
              <Pagination totoRound={totoRound} />
            </>
          )}
        </Box>
      }
    />
  )
}

export default TotoRound
