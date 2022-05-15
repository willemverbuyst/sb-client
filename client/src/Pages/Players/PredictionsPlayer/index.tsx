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
import {
  selectAllPredictionsSortedByTime,
  selectNameOfPlayerOfPredicitons,
} from '../../../store/predictions/selectors'
import { selectToken } from '../../../store/user/selectors'
import * as UTILS from '../../../utils'
import Pagination from './Pagination'

const PredictionsPlayer: React.FC = (): ReactElement => {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectAppLoading)
  const nameOfPlayerOfPredicitons = useSelector(selectNameOfPlayerOfPredicitons)
  const allPredictionsSortedByTime = useSelector(
    selectAllPredictionsSortedByTime
  )
  const token = useSelector(selectToken)
  const { id } = useParams<{ id: string }>()
  const { ronde } = useParams<{ ronde: string }>()
  const { totoronde } = useParams<{ totoronde: string }>()
  const round = Number(ronde)
  const totoRound = Number(totoronde)

  useEffect(() => {
    if (token) {
      dispatch(getAllPredictions(id))
    }
  }, [dispatch, id])

  const filteredFixtures = allPredictionsSortedByTime
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
          {isLoading ? (
            <>
              <PageTitle title="Voorspellingen" color="secondary" />
              <ProgressComponent />
            </>
          ) : filteredFixtures && nameOfPlayerOfPredicitons ? (
            <>
              <PageTitle
                title={`Voorspellingen ${nameOfPlayerOfPredicitons}`}
                color="secondary"
              />
              <Predictions
                predictions={filteredFixtures}
                display="public"
                userNamePlayer={nameOfPlayerOfPredicitons}
              />
              <Pagination totoround={totoRound} round={round} id={id} />
            </>
          ) : nameOfPlayerOfPredicitons ? (
            <>
              <PageTitle
                title={`Voorspellingen ${nameOfPlayerOfPredicitons}`}
                color="secondary"
              />
              <MessageComponent message="Geen wedstrijden met voorspellingen gevonden" />
            </>
          ) : (
            <>
              <PageTitle title="Voorspellingen" color="secondary" />
              <MessageComponent message="Geen data gevonden" />
            </>
          )}
        </Box>
      }
    />
  )
}

export default PredictionsPlayer
