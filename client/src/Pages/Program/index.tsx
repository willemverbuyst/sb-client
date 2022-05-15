import { Box } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'

import MessageComponent from '../../Components/Communication/Message'
import ProgressComponent from '../../Components/Progress'
import PageTitle from '../../Components/Title/PageTitle'
import Guard from '../../Sections/Guard'
import Predictions from '../../Sections/Predictions'
import { selectAppLoading } from '../../store/appState/selectors'
import { selectCurrentRoundSortedByTime } from '../../store/user/selectors'

const Program: React.FC = (): ReactElement => {
  const currentRoundSortedByTime = useSelector(selectCurrentRoundSortedByTime)
  const isLoading = useSelector(selectAppLoading)

  return (
    <Guard
      content={
        <Box>
          <PageTitle title="Programma" color="secondary" />
          {isLoading ? (
            <ProgressComponent />
          ) : currentRoundSortedByTime ? (
            <Predictions
              predictions={currentRoundSortedByTime}
              display="private"
            />
          ) : (
            <MessageComponent message="Geen programma gevonden voor deze week." />
          )}
        </Box>
      }
    />
  )
}

export default Program
