import React, { ReactElement, useState } from 'react'
import { useSelector } from 'react-redux'

import TableCellsOneRow from '../../../Components/Table/TableCellsOneRow'
import { IPlayer } from '../../../models/player.model'
import { Align, CellValue } from '../../../models/table.models'
import { selectUser } from '../../../store/user/selectors'
import * as HELPERS from './helpers'

type IProps = {
  player: IPlayer
  onChange: (player: IPlayer) => void
}

const TableWithPlayersRow: React.FC<IProps> = ({
  player,
  onChange,
}: IProps): ReactElement => {
  const user = useSelector(selectUser)
  const [editModus, setEditModus] = useState<boolean>(false)

  const toggleEditModus = (): void => setEditModus(!editModus)
  const deletePlayer = (): void => onChange(player)

  const playerUserName: JSX.Element = HELPERS.renderPlayerUserName(player)
  const playerTeamLogo: JSX.Element = HELPERS.renderPlayerTeamLogo(player)
  const playerTotalToto: JSX.Element | null =
    HELPERS.renderTotalTotoCheck(player)
  const playerAdmin: boolean = player.admin
  const playerFirstName: string = player.firstName
  const playerLastName: string = player.lastName
  const playerPhoneNumber: string = player.phoneNumber
  const playerEmail: string = player.email
  const editCancelButtonsForAdmin: JSX.Element = HELPERS.renderButtonsForAdmin(
    editModus,
    toggleEditModus,
    deletePlayer
  )

  const cellsRegularUser: [CellValue, Align][] = [
    [playerUserName, 'left'],
    [playerTeamLogo, 'left'],
    [playerTotalToto, 'center'],
    [playerFirstName, 'left'],
  ]

  const cellsAdmin: [CellValue, Align][] = [
    ...cellsRegularUser,
    [playerLastName, 'left'],
    [playerPhoneNumber, 'left'],
    [playerEmail, 'left'],
    [editCancelButtonsForAdmin, 'right'],
  ]

  // Don't render delete btn, to prevent admin being deleted
  const cellsAdminForPlayerIsAdmin: [CellValue, Align][] = [...cellsAdmin]
  cellsAdminForPlayerIsAdmin.splice(cellsAdminForPlayerIsAdmin.length - 1, 1, [
    '',
    'right',
  ])

  return (
    <TableCellsOneRow
      cells={
        user && user.admin && playerAdmin
          ? cellsAdminForPlayerIsAdmin
          : user && user.admin
          ? cellsAdmin
          : cellsRegularUser
      }
    />
  )
}

export default TableWithPlayersRow
