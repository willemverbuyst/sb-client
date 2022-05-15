import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'

import DeleteDialog from '../../../Components/Communication/DeleteDialog'
import { IPlayer } from '../../../models/player.model'
import { playerDelete } from '../../../store/players/action-creators'

interface IProps {
  playerToDelete: IPlayer
  closeDialog: () => void
}

const TableWithPlayersDialog: React.FC<IProps> = ({
  playerToDelete,
  closeDialog,
}: IProps): ReactElement => {
  const dispatch = useDispatch()
  const title = `Weet je zeker dat je ${playerToDelete.firstName} ${playerToDelete.lastName} wilt verwijderen?`
  const content =
    'Wanneer je deze speler verwijderd, wordt alle data uit de database gewist. Er is dan geen weg terug...'

  const handleDelete = () => {
    dispatch(playerDelete(playerToDelete.id))
    closeDialog()
  }

  return (
    <DeleteDialog
      closeDialog={closeDialog}
      title={title}
      content={content}
      handleDelete={handleDelete}
    />
  )
}

export default TableWithPlayersDialog
