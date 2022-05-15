import { TableBody } from '@material-ui/core'
import React, { ReactElement, useState } from 'react'

import { IPlayer } from '../../../models/player.model'
import TableWithPlayersDialog from './TableWithPlayersDialog'
import TableWithPlayersRow from './TableWithPlayersRow'

type IProps = {
  playersSortedByName: IPlayer[]
}

const TableWithPlayersContent = ({
  playersSortedByName,
}: IProps): ReactElement => {
  const [showDialog, setShowDialog] = useState(false)
  const [playerToDelete, setPlayerToDelete] = useState<IPlayer | null>(null)

  const closeDialog = (): void => {
    setShowDialog(false)
  }

  const openDialog = (): void => {
    setShowDialog(true)
  }
  const handleBtnClick = (player: IPlayer): void => {
    setPlayerToDelete(player)
    openDialog()
  }

  const tableContent = (): ReactElement[] =>
    playersSortedByName.map((player) => (
      <TableWithPlayersRow
        key={player.id}
        player={player}
        onChange={handleBtnClick}
      />
    ))

  return (
    <>
      <TableBody>{tableContent()}</TableBody>
      {showDialog && playerToDelete ? (
        <TableWithPlayersDialog
          playerToDelete={playerToDelete}
          closeDialog={closeDialog}
        />
      ) : null}
    </>
  )
}

export default TableWithPlayersContent
