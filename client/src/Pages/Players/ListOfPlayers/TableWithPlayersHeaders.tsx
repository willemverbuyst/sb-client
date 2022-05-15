import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'

import TableHeaders from '../../../Components/Table/TableHeaders'
import { Align } from '../../../models/table.models'
import { selectUser } from '../../../store/user/selectors'

const TableWithPlayersHeaders = (): ReactElement => {
  const user = useSelector(selectUser)
  const headersRegularUser: [string, Align][] = [
    ['user name', 'left'],
    ['team', 'left'],
    ['totaal-toto', 'center'],
    ['naam', 'left'],
  ]
  const headersAdmin: [string, Align][] = [
    ...headersRegularUser,
    ['achternaam', 'left'],
    ['telefoon', 'left'],
    ['email', 'left'],
    ['delete player?', 'right'],
  ]
  return (
    <TableHeaders
      headers={user && user.admin ? headersAdmin : headersRegularUser}
    />
  )
}

export default TableWithPlayersHeaders
