import { Box } from '@material-ui/core'
import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import MessageComponent from '../../../Components/Communication/Message'
import ProgressComponent from '../../../Components/Progress'
import PageTitle from '../../../Components/Title/PageTitle'
import Guard from '../../../Sections/Guard'
import Predictions from '../../../Sections/Predictions'
import { selectAppLoading } from '../../../store/appState/selectors'
import { getAllPredictions } from '../../../store/predictions/action-creators'
import { selectAllPredictionsSortedByTime } from '../../../store/predictions/selectors'
import { selectToken, selectUser } from '../../../store/user/selectors'
import * as UTILS from '../../../utils'
import Pagination from './Pagination'

const PredictionsUser: React.FC = (): ReactElement => {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectAppLoading)
  const allPredictionsSortedByTime = useSelector(
    selectAllPredictionsSortedByTime
  )
  const token = useSelector(selectToken)
  const { ronde } = useParams<{ ronde: string }>()
  const { totoronde } = useParams<{ totoronde: string }>()
  const round = Number(ronde)
  const totoRound = Number(totoronde)
  const user = useSelector(selectUser)

  useEffect(() => {
    if (token && !allPredictionsSortedByTime && user) {
      dispatch(getAllPredictions(user.id))
    }
  }, [dispatch, user, token])

  const filteredPredictions = allPredictionsSortedByTime
    ? [
        ...allPredictionsSortedByTime[totoRound - 1][
          UTILS.calculateIndex(round)
        ],
      ]
    : null

  return (
    <Guard
      content={
        <Box>
          <PageTitle title="Mijn voorspellingen" color="primary" />
          {isLoading ? (
            <ProgressComponent />
          ) : filteredPredictions ? (
            <>
              <Predictions
                predictions={filteredPredictions}
                display="private"
              />
              <Pagination totoround={totoRound} round={round} />
            </>
          ) : (
            <MessageComponent message="Geen wedstrijden met voorspellingen gevonden" />
          )}
        </Box>
      }
    />
  )
}

export default PredictionsUser
