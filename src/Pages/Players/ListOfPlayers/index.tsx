import { Box } from '@material-ui/core'
import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MessageComponent from '../../../Components/Communication/Message'
import ProgressComponent from '../../../Components/Progress'
import PageTitle from '../../../Components/Title/PageTitle'
import Guard from '../../../Sections/Guard'
import { selectAppLoading } from '../../../store/appState/selectors'
import { fetchAllPlayers } from '../../../store/players/action-creators'
import { selectPlayersSortedByName } from '../../../store/players/selectors'
import { selectToken } from '../../../store/user/selectors'
import TableWithPlayers from './TableWithPlayers'

const ListOfPlayers: React.FC = (): ReactElement => {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectAppLoading)
  const playersSortedByName = useSelector(selectPlayersSortedByName)
  const token = useSelector(selectToken)

  useEffect(() => {
    if (token && !playersSortedByName) {
      dispatch(fetchAllPlayers())
    }
  }, [dispatch, playersSortedByName, token])

  return (
    <Guard
      content={
        <Box>
          <PageTitle title="Spelers" color="secondary" />
          {isLoading ? (
            <ProgressComponent />
          ) : playersSortedByName ? (
            <TableWithPlayers playersSortedByName={playersSortedByName} />
          ) : (
            <MessageComponent message="Geen spelers gevonden" />
          )}
        </Box>
      }
    />
  )
}

export default ListOfPlayers
