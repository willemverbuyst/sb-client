import { Box } from '@material-ui/core'
import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PageTitle from '../../../Components/Title/PageTitle'
import Guard from '../../../Sections/Guard'
import { selectAppLoading } from '../../../store/appState/selectors'
import { fetchScoresTotalToto } from '../../../store/scores/action-creators'
import { selectScoresTotalTotoSortedByScore } from '../../../store/scores/selectors'
import { selectToken } from '../../../store/user/selectors'
import renderDisplay from './display'

const TotalToto: React.FC = (): ReactElement => {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectAppLoading)
  const scoresTotalTotoSortedByScore = useSelector(
    selectScoresTotalTotoSortedByScore
  )
  const token = useSelector(selectToken)

  useEffect(() => {
    if (token && !scoresTotalTotoSortedByScore) {
      dispatch(fetchScoresTotalToto())
    }
  }, [dispatch, scoresTotalTotoSortedByScore, token])

  return (
    <Guard
      content={
        <Box>
          <PageTitle title="Totaaltoto" color="secondary" />
          {renderDisplay({ isLoading, scoresTotalTotoSortedByScore })}
        </Box>
      }
    />
  )
}

export default TotalToto
