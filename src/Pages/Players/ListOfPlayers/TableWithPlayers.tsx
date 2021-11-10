import React, { ReactElement } from 'react'

import TableComponent from '../../../Components/Table'
import { IPlayer } from '../../../models/player.model'
import TableWithPlayersContent from './TableWithPlayersContent'
import TableWithPlayersHeaders from './TableWithPlayersHeaders'

type IProps = {
  playersSortedByName: IPlayer[]
}

const TableWithPlayers: React.FC<IProps> = ({
  playersSortedByName,
}: IProps): ReactElement => (
  <TableComponent
    tableHeaders={<TableWithPlayersHeaders />}
    tableContent={
      <TableWithPlayersContent playersSortedByName={playersSortedByName} />
    }
  />
)

export default TableWithPlayers
